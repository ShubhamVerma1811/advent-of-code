import { loadInput } from '../../../helpers/file';

function main() {
  const file = loadInput(__dirname);

  let sum = 0;

  for (let i = 0; i < file.length; i++) {
    const p = file[i];

    if (p.trim() === '(') sum++;
    else {
      sum--;
    }

    if (sum < 0) {
      return i;
    }
  }
}

main();

