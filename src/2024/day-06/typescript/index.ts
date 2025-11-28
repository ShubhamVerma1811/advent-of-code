import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

async function main() {
  const data = await readFile(
    resolve('../../../../', 'data', '2024-06.txt'),
    'utf8'
  );

  // Part 1
  {
    console.time('Part 1');
    const result = part1(data);
    console.info('Result:', result);
    console.timeEnd('Part 1');
  }

  // Part 2
  {
    console.time('Part 2');
    const result = part2(data);
    console.info('Result:', result);
    console.timeEnd('Part 2');
  }
}

main();

class Position {
  public colIdx: number;
  public rowIdx: number;
  public direction: 'up' | 'down' | 'left' | 'right';
  public seen: Set<string>;

  constructor(
    colIdx: number,
    rowIdx: number,
    direction: 'up' | 'down' | 'left' | 'right'
  ) {
    this.colIdx = colIdx;
    this.rowIdx = rowIdx;
    this.direction = direction;
    this.seen = new Set();
  }

  getUp() {
    return { rowIdx: this.rowIdx - 1, colIdx: this.colIdx };
  }

  getRight() {
    return { rowIdx: this.rowIdx, colIdx: this.colIdx + 1 };
  }

  getDown() {
    return { rowIdx: this.rowIdx + 1, colIdx: this.colIdx };
  }

  getLeft() {
    return { rowIdx: this.rowIdx, colIdx: this.colIdx - 1 };
  }

  moveUp() {
    this.rowIdx -= 1;
  }

  moveRight() {
    this.colIdx += 1;
  }

  moveDown() {
    this.rowIdx += 1;
  }

  moveLeft() {
    this.colIdx -= 1;
  }
}

export function part1(data: string) {
  const lines = data.trim().split('\n');
  // @ts-ignore
  let pos: Position = {};
  let sum = 0;

  const grid = lines.map((line, rowIdx) => {
    return line.split('').map((col, colIdx) => {
      if (col === '^') {
        pos = new Position(colIdx, rowIdx, 'up');
      }
      return col;
    });
  });

  pos.seen.add(`${pos.colIdx}-${pos.rowIdx}`);
  sum += 1;

  while (true) {
    if (
      pos.rowIdx < 0 ||
      pos.rowIdx >= grid.length ||
      pos.colIdx < 0 ||
      pos.colIdx >= grid[0].length
    ) {
      break;
    }

    switch (pos.direction) {
      case 'up': {
        const nextPos = pos.getUp();
        const isNextHash = grid?.[nextPos.rowIdx]?.[nextPos.colIdx] === '#';

        if (!isNextHash) {
          pos.moveUp();

          if (!pos.seen.has(`${pos.colIdx}-${pos.rowIdx}`)) {
            pos.seen.add(`${pos.colIdx}-${pos.rowIdx}`);
            sum += 1;
          }
        } else {
          pos.direction = 'right';
        }
        break;
      }
      case 'right': {
        const nextPos = pos.getRight();
        const isNextHash = grid?.[nextPos.rowIdx]?.[nextPos.colIdx] === '#';
        if (!isNextHash) {
          pos.moveRight();

          if (!pos.seen.has(`${pos.colIdx}-${pos.rowIdx}`)) {
            pos.seen.add(`${pos.colIdx}-${pos.rowIdx}`);
            sum += 1;
          }
        } else {
          pos.direction = 'down';
        }
        break;
      }
      case 'down': {
        const nextPos = pos.getDown();
        const isNextHash = grid?.[nextPos.rowIdx]?.[nextPos.colIdx] === '#';
        if (!isNextHash) {
          pos.moveDown();

          if (!pos.seen.has(`${pos.colIdx}-${pos.rowIdx}`)) {
            pos.seen.add(`${pos.colIdx}-${pos.rowIdx}`);
            sum += 1;
          }
        } else {
          pos.direction = 'left';
        }
        break;
      }
      case 'left': {
        const nextPos = pos.getLeft();
        const isNextHash = grid?.[nextPos.rowIdx]?.[nextPos.colIdx] === '#';
        if (!isNextHash) {
          pos.moveLeft();

          if (!pos.seen.has(`${pos.colIdx}-${pos.rowIdx}`)) {
            pos.seen.add(`${pos.colIdx}-${pos.rowIdx}`);
            sum += 1;
          }
        } else {
          pos.direction = 'up';
        }
        break;
      }
    }
  }

  return sum - 1;
}

export function part2(data: string) {
  const lines = data.trim().split('\n');
  // @ts-ignore
  let pos: Position = {};

  let block = 0;
  const placed = new Set();

  const grid = lines.map((line, rowIdx) =>
    line.split('').map((col, colIdx) => {
      if (col === '^') {
        pos = new Position(colIdx, rowIdx, 'up');
      }
      return col;
    })
  );

  pos.seen.add(`${pos.rowIdx}-${pos.colIdx}`);

  while (true) {
    if (
      pos.rowIdx < 0 ||
      pos.rowIdx >= grid.length ||
      pos.colIdx < 0 ||
      pos.colIdx >= grid[0].length
    ) {
      break;
    }

    switch (pos.direction) {
      case 'up': {
        const nextPos = pos.getUp();
        const nextPosInCaseOfBlock = pos.getRight();
        const isNextHash = grid?.[nextPos.rowIdx]?.[nextPos.colIdx] === '#';

        if (!placed.has(`${nextPos.rowIdx}-${nextPos.colIdx}`)) {
          placed.add(`${nextPos.rowIdx}-${nextPos.colIdx}`);
          block += 1;
        }

        if (isNextHash) {
          pos.direction = 'right';
        } else {
          pos.moveUp();
        }
        break;
      }
      case 'right': {
        const nextPos = pos.getRight();
        const nextPosInCaseOfBlock = pos.getDown();
        const isNextHash = grid?.[nextPos.rowIdx]?.[nextPos.colIdx] === '#';

        if (!placed.has(`${nextPos.rowIdx}-${nextPos.colIdx}`)) {
          placed.add(`${nextPos.rowIdx}-${nextPos.colIdx}`);
          block += 1;
        }

        if (isNextHash) {
          pos.direction = 'down';
        } else {
          pos.moveRight();
        }
        break;
      }
      case 'down': {
        const nextPos = pos.getDown();
        const nextPosInCaseOfBlock = pos.getLeft();
        const isNextHash = grid?.[nextPos.rowIdx]?.[nextPos.colIdx] === '#';

        if (!placed.has(`${nextPos.rowIdx}-${nextPos.colIdx}`)) {
          placed.add(`${nextPos.rowIdx}-${nextPos.colIdx}`);
          block += 1;
        }

        if (isNextHash) {
          pos.direction = 'left';
        } else {
          pos.moveDown();
        }
        break;
      }
      case 'left': {
        const nextPos = pos.getLeft();
        const nextPosInCaseOfBlock = pos.getUp();
        const isNextHash = grid?.[nextPos.rowIdx]?.[nextPos.colIdx] === '#';

        if (!placed.has(`${nextPos.rowIdx}-${nextPos.colIdx}`)) {
          placed.add(`${nextPos.rowIdx}-${nextPos.colIdx}`);
          block += 1;
        }

        if (isNextHash) {
          pos.direction = 'down';
        } else {
          pos.moveLeft();
        }
        break;
      }
    }
  }

  console.log(pos.seen);

  return block;
}
