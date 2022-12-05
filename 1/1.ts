const file = Deno.readTextFileSync("./input.txt").trimEnd();

const calories = file.split("\n\n").map((line) =>
  line
    .split("\n")
    .map(Number)
    .reduce((acc, n) => acc + n, 0)
);

const result = Math.max(...calories);

console.log(result);
