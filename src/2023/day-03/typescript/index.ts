import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

async function main() {
  const data = await readFile(
    resolve('../../../../', 'data', '2023-03.txt'),
    'utf8'
  )

  // Part 1
  {
    console.time('Part 1')
    const result = part1(data)
    console.log('Result:', result)
    console.timeEnd('Part 1')
  }

  // Part 2
  {
    console.time('Part 2')
    const result = part2(data)
    console.log('Result:', result)
    console.timeEnd('Part 2')
  }
}

main()

export function part1(data: string) {
  let sum = 0

  const lines = data.trim().split('\n')
  const reg = new RegExp(/\d+/g)
  lines.map((line, lineNo) => {
    const n = line.length
    const m = lines[0].length

    function isSymbol(i: number, j: number) {
      if (!(0 <= i && i < n && 0 <= j && j < m)) {
        return false
      }

      // @ts-ignore
      return lines?.[i]?.[j] !== '.' && Number.isNaN(lines?.[i]?.[j])
    }

    let match: RegExpExecArray | null
    while ((match = reg.exec(line))) {
      const i = match.index
      const j = i + match[0].length - 1

      if (isSymbol(lineNo, i - 1) || isSymbol(lineNo, j + 1)) {
        sum += parseInt(match[0])
        continue
      }

      for (let k = i - 1; k <= j + 1; k++) {
        if (isSymbol(lineNo - 1, k) || isSymbol(lineNo + 1, k)) {
          sum += parseInt(match[0])
        }
      }
    }
  })

  return sum
}

export function part2(data: string) {
  const map: Map<string, Array<string>> = new Map()

  const lines = data.trim().split('\n')
  const reg = new RegExp(/\d+/g)

  lines.map((line, lineNo) => {
    const n = line.length
    const m = lines[0].length

    function findGearValues(i: number, j: number, num: string) {
      if (!(0 <= i && i < n && 0 <= j && j < m)) {
        return false
      }

      const gear =
        lines?.[i]?.[j] !== '.' &&
        // @ts-ignore
        Number
          // @ts-ignore
          .isNaN(lines[i][j]) &&
        lines[i][j] === '*'

      const coords = `${i}${j}`
      if (gear) {
        if (map.has(coords)) {
          map.set(coords, (map.get(coords) || []).concat(num))
        } else {
          map.set(coords, [num])
        }
      }

      return gear
    }

    let match: RegExpExecArray | null
    while ((match = reg.exec(line))) {
      const i = match.index
      const j = i + match[0].length - 1

      if (
        findGearValues(lineNo, i - 1, match[0]) ||
        findGearValues(lineNo, j + 1, match[0])
      ) {
        continue
      }

      for (let k = i - 1; k <= j + 1; k++) {
        if (
          findGearValues(lineNo - 1, k, match[0]) ||
          findGearValues(lineNo + 1, k, match[0])
        ) {
        }
      }
    }
  })

  let mul = 0

  map.forEach((m) => {
    if (m.length > 1) {
      mul += m.reduce((a, c) => {
        return a * Number(c)
      }, 1)
    }
  })

  return mul
}
