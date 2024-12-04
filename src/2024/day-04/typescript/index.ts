import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

async function main() {
  const data = await readFile(
    resolve('../../../../', 'data', '2024-04.txt'),
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
  const matrix = data
    .trim()
    .split('\n')
    .map((line) => line.split(''));

  let sum = 0;

  for (let rowIdx = 0; rowIdx < matrix.length; rowIdx++) {
    for (let cellIdx = 0; cellIdx < matrix[rowIdx].length; cellIdx++) {
      const top = getTop(matrix, rowIdx, cellIdx).join('');
      const left = getLeft(matrix, rowIdx, cellIdx).join('');
      const topLeft = getTopLeft(matrix, rowIdx, cellIdx).join('');
      const topRight = getTopRight(matrix, rowIdx, cellIdx).join('');

      if (top === 'XMAS' || top === 'SAMX') {
        sum += 1;
      }
      if (left === 'XMAS' || left === 'SAMX') {
        sum += 1;
      }
      if (topLeft === 'XMAS' || topLeft === 'SAMX') {
        sum += 1;
      }
      if (topRight === 'XMAS' || topRight === 'SAMX') {
        sum += 1;
      }
    }
  }

  return sum;
}

export function part2(data: string) {
  const matrix = data
    .trim()
    .split('\n')
    .map((line) => line.split(''));

  let sum = 0;

  for (let rowIdx = 0; rowIdx < matrix.length; rowIdx++) {
    for (let cellIdx = 0; cellIdx < matrix[rowIdx].length; cellIdx++) {
      const c = matrix[rowIdx][cellIdx];

      if (c === 'A') {
        const topLeft = matrix[rowIdx - 1]?.[cellIdx - 1];
        const topRight = matrix[rowIdx - 1]?.[cellIdx + 1];
        const bottomLeft = matrix[rowIdx + 1]?.[cellIdx - 1];
        const bottomRight = matrix[rowIdx + 1]?.[cellIdx + 1];

        const l = topLeft + c + bottomRight;
        const r = topRight + c + bottomLeft;

        if ((l === 'MAS' || l === 'SAM') && (r === 'MAS' || r === 'SAM')) {
          sum += 1;
        }
      }
    }
  }

  return sum;
}

function getTop(matrix: string[][], x: number, y: number): string[] {
  return [
    matrix?.[x]?.[y],
    matrix?.[x - 1]?.[y],
    matrix?.[x - 2]?.[y],
    matrix?.[x - 3]?.[y],
  ];
}

function getLeft(matrix: string[][], x: number, y: number): string[] {
  return [
    matrix?.[x]?.[y],
    matrix?.[x]?.[y - 1],
    matrix?.[x]?.[y - 2],
    matrix?.[x]?.[y - 3],
  ];
}

function getTopLeft(matrix: string[][], x: number, y: number): string[] {
  return [
    matrix?.[x]?.[y],
    matrix?.[x - 1]?.[y - 1],
    matrix?.[x - 2]?.[y - 2],
    matrix?.[x - 3]?.[y - 3],
  ];
}

function getTopRight(matrix: string[][], x: number, y: number): string[] {
  return [
    matrix?.[x]?.[y],
    matrix?.[x - 1]?.[y + 1],
    matrix?.[x - 2]?.[y + 2],
    matrix?.[x - 3]?.[y + 3],
  ];
}
