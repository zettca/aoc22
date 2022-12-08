const file = Deno.readTextFileSync("./input.txt").trimEnd();

const lines = file.split("\n").map((l) => l.split("").map(Number));

const getMax = (arr: number[]) => (arr.length ? Math.max(...arr) : -1);
const getColumn = <T>(arr: T[][], i: number) => arr.map((l) => l[i]);
const splitAt = <T>(arr: T[], i: number) => [arr.slice(0, i), arr.slice(i + 1)];

const numVisible = lines.reduce((acc, line, x) => {
  const numVisibleLine = line.reduce((acc2, value, y) => {
    const column = getColumn(lines, y);
    const maxes = [...splitAt(line, y), ...splitAt(column, x)].map(getMax);

    return acc2 + Number(value > Math.min(...maxes)); // dirty hack or nice? 🤔
  }, 0);

  return acc + numVisibleLine;
}, 0);

console.log(numVisible);
