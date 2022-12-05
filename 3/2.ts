const file = Deno.readTextFileSync("./input.txt").trimEnd();

const scoreOrder = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const result = file
  .split("\n")
  .reduce((acc, line, i) => acc + line + ((i + 1) % 3 === 0 ? "," : "."), "")
  .split(",")
  .map((line) => {
    const [l1, l2, l3] = line.split(".");
    return l1.split("").find((c) => l2.includes(c) && l3.includes(c));
  })
  .reduce((acc, c) => acc + scoreOrder.indexOf(c || "ç") + 1, 0);

console.log(result);
