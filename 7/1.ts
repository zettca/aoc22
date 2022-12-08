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
    .filter(([subDir]) => subDir.startsWith(`${dir}/`))
    .reduce((acc, [, subSize]) => acc + subSize, 0);

  return acc.set(dir, size + subDirsSize);
}, new Map<string, number>());

const result = [...dirsSummed]
  .filter(([, size]) => size <= 100000)
  .reduce((acc, [, size]) => acc + size, 0);

console.log(result);
