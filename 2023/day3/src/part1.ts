import { loadInput } from '../../../helpers/file';

function main() {
  const file = loadInput(__dirname);

  let sum = 0;

  const lines = file.split('\n');
  const reg = new RegExp(/\d+/g);
  lines.map((line, lineNo) => {
    const n = line.length;
    const m = lines[0].length;

    function isSymbol(i: number, j: number) {
      if (!(0 <= i && i < n && 0 <= j && j < m)) {
        return false;
      }

      // @ts-ignore
      return lines?.[i]?.[j] !== '.' && isNaN(lines?.[i]?.[j]);
    }

    let match: RegExpExecArray | null;
    while ((match = reg.exec(line))) {
      let i = match.index,
        j = i + match[0].length - 1;

      if (isSymbol(lineNo, i - 1) || isSymbol(lineNo, j + 1)) {
        sum += parseInt(match[0]);
        continue;
      }

      for (let k = i - 1; k <= j + 1; k++) {
        if (isSymbol(lineNo - 1, k) || isSymbol(lineNo + 1, k)) {
          sum += parseInt(match[0]);

          continue;
        }
      }
    }
  });

  return sum;
}

main();

