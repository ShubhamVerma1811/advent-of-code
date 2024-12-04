import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

async function main() {
  const data = await readFile(
    resolve('../../../../', 'data', '2024-02.txt'),
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
  let sum = 0;
  let safe = false;

  for (const line of lines) {
    const level = line.split(' ').map((i) => +i);

    const asc = level[0] <= level[1];

    for (let i = 0; i < level.length - 1; i++) {
      const j = i + 1;
      const diff = asc ? level[j] - level[i] : level[i] - level[j];

      if (diff > 3 || diff < 1) {
        safe = false;
        break;
      }

      if (asc && level[i] > level[j]) {
        safe = false;
        break;
      }

      if (!asc && level[i] < level[j]) {
        safe = false;
        break;
      }

      safe = true;
    }

    if (safe) {
      sum++;
      safe = false;
    }
  }

  return sum;
}

export function part2(data: string) {}
