import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

async function main() {
  const data = await readFile(
    resolve('../../../../', 'data', '2024-03.txt'),
    'utf8'
  );

  // Part 1
  {
    console.time('Part 1');
    const result = part1(data);
    console.info('Result:', result);
    console.timeEnd('Part 1');
  }

  // Part 2
  {
    console.time('Part 2');
    const result = part2(data);
    console.info('Result:', result);
    console.timeEnd('Part 2');
  }
}

main();

export function part1(data: string) {
  const regEx = new RegExp(/mul\((\d{1,3}),(\d{1,3})\)/gm);
  const lines = data.trim().split('\n');
  let sum = 0;

  for (const line of lines) {
    const res = line.match(regEx);

    if (!res) break;

    for (const r of res) {
      const x = r.replace('mul(', '').replace(')', '');
      const [a, b] = x.split(',');
      sum += parseInt(a) * parseInt(b);
    }
  }

  return sum;
}

export function part2(data: string) {
  const lines = data.trim().split('\n');
  const regEx = new RegExp(/do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\)/gm);
  const DONT = "don't()";
  const DO = 'do()';

  let sum = 0;
  let isSafe = true;

  for (const line of lines) {
    const res = line.match(regEx);

    if (!res) break;

    for (const r of res) {
      if (r === DONT) {
        isSafe = false;
        continue;
      }

      if (r === DO) {
        isSafe = true;
        continue;
      }

      if (isSafe) {
        const x = r.replace('mul(', '').replace(')', '');
        const [a, b] = x.split(',');
        sum += parseInt(a) * parseInt(b);
      }
    }
  }

  return sum;
}
