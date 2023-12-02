import fs from 'fs';

function main() {
  const file = fs.readFileSync('./bin/input.txt').toString();

  const lines = file.split('\n');

  return lines
    .map((line: string) => {
      const max = {
        red: 0,
        green: 0,
        blue: 0,
      };
      line
        .split(': ')[1]
        .split('; ')
        .map((set) => {
          const pulls = set.split(', ');
          return pulls.map((c) => {
            const [n, col] = c.split(' ');
            max[col] = Math.max(max[col], Number(n));
          });
        });

      return max;
    })
    .reduce((a, c, i) => {
      return (a += c.blue * c.green * c.red);
    }, 0);
}

console.log(main());

