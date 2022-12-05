const file = Deno.readTextFileSync("./input.txt").trimEnd();

const options: Record<string, Record<string, number>> = {
  X: { A: 3, B: 1, C: 2 },
  Y: { A: 1, B: 2, C: 3 },
  Z: { A: 2, B: 3, C: 1 },
};

const getRoundScore = (res: string) => ({ X: 0, Y: 3, Z: 6 }[res] || 0);

const getOptionScore = (a: string, b: string) => options[b][a] || 0;

const result = file
  .split("\n")
  .map((game) => {
    const [a, b] = game.split(" ");
    return getOptionScore(a, b) + getRoundScore(b);
  })
  .reduce((acc, r) => acc + r, 0);

console.log(result);
