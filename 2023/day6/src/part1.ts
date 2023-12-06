import { loadInput } from '../../../helpers/file';

function main() {
  const file = loadInput(__dirname);

  const lines = file.trim().split('\n');

  const times = lines[0]
    .split(/\s+/)
    .slice(1)
    .map((i) => +i);

  const distance = lines[1]
    .split(/\s+/)
    .slice(1)
    .map((i) => +i);

  return times
    .map((time, idx) => {
      let sum: number[] = [];
      for (let i = 0; i <= time; i++) {
        let x = time,
          y = x - i;

        if (y * i > distance[idx]) {
          sum.push(i);
        }
      }

      return sum;
    })
    .reduce((a, c) => a * c.length, 1);
}

main();

