import { loadInput } from '../../../helpers/file';

function main() {
  const file = loadInput(__dirname);
  const lines = file.trim().split('\n');

  const map: Map<number, { points: number; copies: number }> = new Map();

  let sum = 0;

  lines.map((line) => {
    const [game, cards] = line.split(': ');
    const gameID = Number(game.replace('Card', '').trim());

    const points = getCardPoints(cards);

    map.set(gameID, {
      copies: 1,
      points,
    });
  });

  lines.map((line) => {
    const [game, cards] = line.split(': ');
    const gameID = Number(game.replace('Card', '').trim());

    //@ts-ignore
    const { copies, points } = map.get(gameID);

    sum += copies;

    for (let i = gameID + 1; i <= gameID + points; i++) {
      const v = map.get(i);

      if (v) {
        map.set(i, {
          ...v,
          copies: v.copies + copies,
        });
      }
    }
  });

  return sum;
}

function getCardPoints(cards: string) {
  const [_win, _my] = cards.split(' | ');
  const win = _win.split(' ');
  const my = _my.split(' ');

  return my.reduce(
    (a, c) => (win.find((j) => c.trim() === j.trim()) ? a + 1 : a),
    0
  );
}

main();

