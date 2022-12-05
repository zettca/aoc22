const file = Deno.readTextFileSync("./input.txt").trimEnd();

const options: Record<string, Record<string, number>> = {
  X: { A: 3, B: 0, C: 6 },
  Y: { A: 6, B: 3, C: 0 },
  Z: { A: 0, B: 6, C: 3 },
};

const getOptionScore = (value: string) => "XYZ".indexOf(value) + 1;

const result = file
  .split("\n")
  .map((g) => {
    const [a, b] = g.split(" ");
    return getOptionScore(b) + options[b][a];
  })
  .reduce((acc, r) => acc + r, 0);

console.log(result);
