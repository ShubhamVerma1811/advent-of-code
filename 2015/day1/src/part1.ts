import { loadInput } from '../../../helpers/file';

function main() {
  const file = loadInput(__dirname);

  let sum = 0;

  for (const i of file) {
    if (i.trim() === '(') sum++;
    else {
      sum--;
    }
  }

  return sum;
}

main();

