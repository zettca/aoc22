const file = Deno.readTextFileSync("./input.txt").trimEnd();

const calories = file.split("\n\n").map((line) =>
  line
    .split("\n")
    .map(Number)
    .reduce((acc, n) => acc + n, 0)
);

const result = calories
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((acc, n) => acc + n, 0);

console.log(result);
