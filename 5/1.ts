const file = Deno.readTextFileSync("./input.txt").trimEnd();

const [cratesRaw, actionsRaw] = file.split("\n\n").map((l) => l.split("\n"));

const getCrates = () => {
  const cratesParsed = cratesRaw
    .slice(0, -1)
    .map((c) => c.replace(/[\[\]]/g, "").replaceAll("  ", " "));

  const numCrates = (cratesParsed[0].length + 1) / 2;

  return Array.from(Array(numCrates), (_, i) =>
    cratesParsed
      .map((crate) => crate[i * 2])
      .reverse()
      .join("")
      .trim()
  );
};

const result = actionsRaw
  .map((action) => (action.match(/\d+/g) || []).map(Number))
  .reduce((acc, action) => {
    const [num, from, to] = [action[0], action[1] - 1, action[2] - 1];
    acc[to] += acc[from].slice(-num).split("").reverse().join("");
    acc[from] = acc[from].slice(0, -num);
    return acc;
  }, getCrates())
  .map((c) => c.at(-1))
  .join("");

console.log(result);
