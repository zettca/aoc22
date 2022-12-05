const file = Deno.readTextFileSync("./input.txt").trimEnd();

const isContained = ([x1, x2]: number[], [y1, y2]: number[]) =>
  x1 >= y1 && x2 <= y2;

const result = file
  .split("\n")
  .map((pair) => pair.split(",").map((p) => p.split("-").map(Number)))
  .filter(([elf1, elf2]) => isContained(elf1, elf2) || isContained(elf2, elf1));

console.log(result.length);
