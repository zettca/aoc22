const file = Deno.readTextFileSync("./input.txt").trimEnd();

const lines = file.split("\n").map((l) => l.split("").map(Number));

const multiply = (arr: number[]) => arr.reduce((acc, v) => acc * v, 1);
const getColumn = <T>(arr: T[][], i: number) => arr.map((l) => l[i]);
const splitAt = <T>(arr: T[], i: number) => [arr.slice(0, i), arr.slice(i + 1)];

const score = lines.reduce((acc, line, x) => {
  const scoreLine = line.reduce((acc2, value, y) => {
    const column = getColumn(lines, y);
    const distances = [splitAt(line, y), splitAt(column, x)]
      .flatMap(([p1, p2]) => [p1.reverse(), p2])
      .map((dir) => {
        if (dir.length === 0) return 0;
        const dist = dir.findIndex((v) => v >= value);
        return dist === -1 ? dir.length : dist + 1;
      });

    const treeScore = multiply(distances);
    return Math.max(acc2, treeScore);
  }, 0);

  return Math.max(acc, scoreLine);
}, 0);

console.log(score);
