import fs from 'fs';
type colors = 'red' | 'blue' | 'green';

const config = {
  red: 12,
  green: 13,
  blue: 14,
};

function main() {
  const file = fs.readFileSync('./bin/input.txt').toString();

  const lines = file.split('\n');

  return lines
    .map((line: string) => {
      return line
        .split(': ')[1]
        .split('; ')
        .map((set) => {
          const pulls = set.split(', ');
          return pulls.every((s) => {
            const [n, col] = s.split(' ');
            return config[col] >= Number(n);
          });
        })
        .every((p) => p);
    })
    .reduce((a, c, i) => {
      return c ? a + i + 1 : a;
    }, 0);
}

console.log(main());

