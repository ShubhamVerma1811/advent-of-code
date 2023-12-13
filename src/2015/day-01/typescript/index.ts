import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

async function main() {
  const data = await readFile(
    resolve('../../../../', 'data', '2015-01.txt'),
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

function part1(data: string) {
  let sum = 0

  for (const i of data) {
    if (i.trim() === '(') sum++
    else {
      sum--
    }
  }

  return sum
}

function part2(data: string) {
  let sum = 0

  for (let i = 0; i < data.length; i++) {
    const p = data[i]

    if (p.trim() === '(') sum++
    else {
      sum--
    }

    if (sum < 0) {
      return i
    }
  }
}
