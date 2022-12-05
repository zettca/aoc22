const file = Deno.readTextFileSync("./input.txt").trimEnd();

const hasOverlap = ([x1, x2]: number[], [y1, y2]: number[]) =>
  x1 <= y2 && y1 <= x2;

const result = file
  .split("\n")
  .map((pair) => pair.split(",").map((p) => p.split("-").map(Number)))
  .filter(([elf1, elf2]) => hasOverlap(elf1, elf2));

console.log(result.length);
