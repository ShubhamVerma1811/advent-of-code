import fs from 'fs';

function main() {
  const file = fs.readFileSync('./bin/input.txt').toString();

  const lines = file.split('\n');
  let sum = 0;

  enum words {
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  }

  for (const line of lines) {
    // RegEx spoiler alert: You can also write a regex where it sort of starts over instead of continuing where it left off. A bit slower but something like /(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g. Be aware, this doesn't work in Safari - Robin, Discord
    let reg = /(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g;

    const res = [...line.matchAll(reg)];

    if (!res.length) {
      throw new Error('No match');
    }

    const f = isNaN(Number(res[0][1])) ? words[res[0][1]] : parseInt(res[0][1]);

    const l = isNaN(Number(res[res.length - 1][1]))
      ? words[res[res.length - 1][1]]
      : parseInt(res[res.length - 1][1]);

    sum += f * 10 + l;
  }

  console.log(sum);

  return sum;
}

main();

