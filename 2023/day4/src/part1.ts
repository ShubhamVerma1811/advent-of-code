import { loadInput } from '../../../helpers/file';

function main() {
  const file = loadInput(__dirname);
  const lines = file.split('\n');

  return lines
    .map((line) => {
      const cards = line.split(': ')[1];
      let [_win, _my] = cards.split(' | ');
      let win = _win.split(' ');
      let my = _my.split(' ');

      let count = my.reduce(
        (a, c) => (win.find((j) => c.trim() === j.trim()) ? a + 1 : a),
        0
      );

      let sum = count > 0 ? Math.pow(2, count - 1) : 0;

      return sum;
    })
    .reduce((a, c) => a + c, 0);
}

main();

