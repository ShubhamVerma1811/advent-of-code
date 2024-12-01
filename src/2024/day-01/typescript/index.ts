import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

async function main() {
  const data = await readFile(
    resolve('../../../../', 'data', '2024-01.txt'),
    'utf8'
  );

  // Part 1
  {
    console.time('Part 1');
    const result = part1(data);
    console.timeEnd('Part 1');
  }

  // Part 2
  {
    console.time('Part 2');
    const result = part2(data);
    console.timeEnd('Part 2');
  }
}

main();

export function part1(data: string) {
  const lines = data.trim().split('\n');
  const left = [];
  const right = [];
  let distance = 0;
  for (const line of lines) {
    const x = line.split('   ');
    left.push(x[0]);
    right.push(x[1]);
  }

  left.sort((a, b) => parseInt(a) - parseInt(b));
  right.sort((a, b) => parseInt(a) - parseInt(b));

  for (let i = 0; i < left.length; i++) {
    distance += Math.abs(left[i] - right[i]);
  }

  return distance;
}

export function part2(data: string) {
  const lines = data.trim().split('\n');
  const left = [];
  const scoreMap = {};
  let res = 0;

  for (const line of lines) {
    const x = line.split('   ');
    left.push(x[0]);
    scoreMap[x[1]] = scoreMap[x[1]] ? scoreMap[x[1]] + 1 : 1;
  }

  for (let i = 0; i < left.length; i++) {
    res += left[i] * (scoreMap[left[i]] || 0);
  }

  return res;
}
