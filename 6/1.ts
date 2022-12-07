const file = Deno.readTextFileSync("./input.txt").trimEnd();

const getFirstUniqueIndex = (str: string, num: number) => {
  const regexRepeating = /^.*(.).*\1.*$/;

  for (let i = 0; i < str.length; i++) {
    const group = str.slice(i, i + num);
    if (!regexRepeating.test(group)) return i + num;
  }

  return -1;
};

console.log(getFirstUniqueIndex(file, 4));
