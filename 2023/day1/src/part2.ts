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
    // TODO:: fix this regex

    let reg = /\d|zero|one|two|three|four|five|six|seven|eight|nine/g;

    // TODO:: eightwo must be 82 not 88 or 22
    const res = line.match(reg);

    if (!res) {
      throw new Error('No match');
    }

    const f = isNaN(Number(res?.[0])) ? words[res?.[0]] : parseInt(res?.[0]);
    const l = isNaN(Number(res?.[res?.length - 1]))
      ? words[res?.[res?.length - 1]]
      : parseInt(res?.[res?.length - 1]);

    sum += parseInt(`${f}${l}`);
  }

  console.log(sum);

  return sum;
}

main();

