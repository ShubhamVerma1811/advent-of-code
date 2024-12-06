import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

async function main() {
  const data = await readFile(
    resolve('../../../../', 'data', '2024-06.txt'),
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
  // @ts-ignore
  let guardPos: {
    x: number;
    y: number;
    direction: 'up' | 'down' | 'left' | 'right';
  } = {};

  let sum = 0;
  const seen = new Set();

  const grid = lines.map((line, rowIdx) => {
    return line.split('').map((col, colIdx) => {
      if (col === '^') {
        guardPos = {
          x: colIdx,
          y: rowIdx,
          direction: 'up',
        };
      }
      return col;
    });
  });

  seen.add(`${guardPos.x}-${guardPos.y}`);
  sum += 1;

  while (true) {
    if (
      guardPos.y < 0 ||
      guardPos.y >= grid.length ||
      guardPos.x < 0 ||
      guardPos.x >= grid[0].length
    ) {
      break;
    }

    switch (guardPos.direction) {
      case 'up':
        if (grid?.[guardPos.y - 1]?.[guardPos.x] !== '#') {
          guardPos.y -= 1;

          if (!seen.has(`${guardPos.x}-${guardPos.y}`)) {
            seen.add(`${guardPos.x}-${guardPos.y}`);
            sum += 1;
          }
        } else {
          guardPos.direction = 'right';
        }
        break;
      case 'right':
        if (grid?.[guardPos.y]?.[guardPos.x + 1] !== '#') {
          guardPos.x += 1;

          if (!seen.has(`${guardPos.x}-${guardPos.y}`)) {
            seen.add(`${guardPos.x}-${guardPos.y}`);
            sum += 1;
          }
        } else {
          guardPos.direction = 'down';
        }
        break;
      case 'down':
        if (grid?.[guardPos.y + 1]?.[guardPos.x] !== '#') {
          guardPos.y += 1;

          if (!seen.has(`${guardPos.x}-${guardPos.y}`)) {
            seen.add(`${guardPos.x}-${guardPos.y}`);
            sum += 1;
          }
        } else {
          guardPos.direction = 'left';
        }
        break;
      case 'left':
        if (grid?.[guardPos.y]?.[guardPos.x - 1] !== '#') {
          guardPos.x -= 1;

          if (!seen.has(`${guardPos.x}-${guardPos.y}`)) {
            seen.add(`${guardPos.x}-${guardPos.y}`);
            sum += 1;
          }
        } else {
          guardPos.direction = 'up';
        }
        break;
    }
  }

  return sum - 1;
}

export function part2(data: string) {}
