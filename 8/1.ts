const file = Deno.readTextFileSync("./input.txt").trimEnd();

const lines = file.split("\n").map((l) => l.split("").map(Number));

const prettyLines = lines.map(() => [] as string[]);

const getColumn = <T>(arr: T[][], idx: number) => arr.map((l) => l[idx]);

let numVisible = 0;

for (let l = 0; l < lines.length; l++) {
  const line = lines[l];
  for (let c = 0; c < line.length; c++) {
    const tree = line[c];
    const column = getColumn(lines, c);

    const maxes = [
      column.slice(0, l),
      column.slice(l + 1),
      line.slice(0, c),
      line.slice(c + 1),
    ].map((arr) => (arr.length > 0 ? Math.max(...arr) : -1));

    const isTallest = maxes.some((max) => tree > max);
    if (isTallest) numVisible++;

    prettyLines[l][c] = isTallest ? String(tree) : " ";
  }
}

console.log(numVisible);
