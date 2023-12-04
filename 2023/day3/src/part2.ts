import { loadInput } from '../../../helpers/file';

function main() {
  const file = loadInput(__dirname);

  const map: Map<string, Array<string>> = new Map();

  const lines = file.split('\n');
  const reg = new RegExp(/\d+/g);

  lines.map((line, lineNo) => {
    const n = line.length;
    const m = lines[0].length;

    function findGearValues(i: number, j: number, num: string) {
      if (!(0 <= i && i < n && 0 <= j && j < m)) {
        return false;
      }

      const gear =
        lines?.[i]?.[j] !== '.' &&
        // @ts-ignore
        isNaN(lines[i][j]) &&
        lines[i][j] === '*';

      const coords = `${i}${j}`;
      if (gear) {
        if (map.has(coords)) {
          map.set(coords, (map.get(coords) || []).concat(num));
        } else {
          map.set(coords, [num]);
        }
      }

      return gear;
    }

    let match: RegExpExecArray | null;
    while ((match = reg.exec(line))) {
      let i = match.index,
        j = i + match[0].length - 1;

      if (
        findGearValues(lineNo, i - 1, match[0]) ||
        findGearValues(lineNo, j + 1, match[0])
      ) {
        continue;
      }

      for (let k = i - 1; k <= j + 1; k++) {
        if (
          findGearValues(lineNo - 1, k, match[0]) ||
          findGearValues(lineNo + 1, k, match[0])
        ) {
          continue;
        }
      }
    }
  });

  let mul = 0;

  map.forEach((m) => {
    if (m.length > 1) {
      mul += m.reduce((a, c) => {
        return a * Number(c);
      }, 1);
    }
  });

  return mul;
}

main();

