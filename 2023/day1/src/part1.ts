import fs from 'fs';

function main() {
  const file = fs.readFileSync('./bin/input.txt').toString();

  const lines = file.split('\n');
  let sum = 0;

  for (const line of lines) {
    let i = 0,
      j = line.length - 1;

    while (i <= j) {
      if (!isNaN(Number(line[i])) && !isNaN(Number(line[j]))) {
        break;
      } else {
        if (isNaN(Number(line[i]))) {
          ++i;
        }
        if (isNaN(Number(line[j]))) {
          --j;
        }
      }
    }

    sum += parseInt(`${line[i]}${line[j]}`);
  }

  console.log(sum);

  return sum;
}

main();

