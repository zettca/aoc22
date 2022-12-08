const file = Deno.readTextFileSync("./input.txt").trimEnd();

let cwd = "/";

const getParentDir = (str: string) => str.slice(0, str.lastIndexOf("/"));

const getNewDir = (currentDir: string, name: string) => {
  if (currentDir === "/") return `/${name}`;
  if (name === "..") return getParentDir(currentDir);
  return `${currentDir}/${name}`;
};

const dirs = file
  .replaceAll("$ ", "\n")
  .trim()
  .split("\n\n") // split $ commands
  .slice(1) // ignore starting cd /
  .reduce((acc, line) => {
    if (line.startsWith("cd ")) {
      const [, name] = line.split(" ");
      cwd = getNewDir(cwd, name);
      return acc;
    }

    const dirSize = line // ls + children listing
      .split("\n")
      .slice(1)
      .reduce((acc, line) => {
        if (line.startsWith("dir")) return acc;
        const [size] = line.split(" ");
        return acc + Number(size);
      }, 0);
    return acc.set(cwd, dirSize);
  }, new Map<string, number>());

const dirsSummed = [...dirs].reduce((acc, [dir, size], _i, arr) => {
  const subDirsSize = arr
    .filter(([subDir]) => dir === "/" || subDir.startsWith(`${dir}/`))
    .reduce((acc, [, subSize]) => acc + subSize, 0);

  return acc.set(dir, size + subDirsSize);
}, new Map<string, number>());

const sizeToFree = 3 * 10 ** 7 - (7 * 10 ** 7 - dirsSummed.get("/")!);
const result = [...dirsSummed]
  .filter(([, size]) => size >= sizeToFree)
  .sort(([, a], [, b]) => a - b);

console.log(result[0][1]);
