const file = Deno.readTextFileSync("./input.txt").trimEnd();

const scoreOrder = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const result = file
  .split("\n")
  .map((sack) => {
    const mid = sack.length / 2;
    const [p1, p2] = [sack.slice(0, mid), sack.slice(mid)];
    return p1.split("").find((char) => p2.includes(char));
  })
  .reduce((acc, score) => acc + scoreOrder.indexOf(score || "ç") + 1, 0);

console.log(result);
