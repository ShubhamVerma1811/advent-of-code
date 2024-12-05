// TODO:: refactor

import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

async function main() {
  const data = await readFile(
    resolve('../../../../', 'data', '2024-05.txt'),
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
  const lines = data.trim().split('\n');
  const pages = lines.slice(0, lines.indexOf(''));
  const updates = lines
    .slice(lines.indexOf('') + 1)
    .map((i) => i.split(',').map(Number));

  let sum = 0;

  for (let i = 0; i < updates.length; i++) {
    const update = updates[i];
    let safe = false;

    outerLoop: for (let j = 0; j < update.length; j++) {
      for (let k = j + 1; k < update.length; k++) {
        const str = `${update[j]}|${update[k]}`;
        if (!pages.includes(str)) {
          safe = false;
          break outerLoop;
        }
        safe = true;
      }
    }

    if (safe) {
      sum += update[Math.floor(update.length / 2)];
    }
  }

  return sum;
}

export function part2(data: string) {
  const lines = data.trim().split('\n');
  const pages = lines.slice(0, lines.indexOf(''));
  const updates = lines
    .slice(lines.indexOf('') + 1)
    .map((i) => i.split(',').map(Number));

  let sum = 0;

  for (let i = 0; i < updates.length; i++) {
    const update = updates[i];
    let safe = false;

    outerLoop: for (let j = 0; j < update.length; j++) {
      for (let k = j + 1; k < update.length; k++) {
        const str = `${update[j]}|${update[k]}`;
        if (!pages.includes(str)) {
          if (pages.includes(`${update[k]}|${update[j]}`)) {
            [update[j], update[k]] = [update[k], update[j]];
            safe = true;
            // continue outerLoop;
          } else {
            safe = false;
            break outerLoop;
          }
        }
      }
    }

    if (safe) {
      sum += update[Math.floor(update.length / 2)];
    }
  }

  return sum;
}
