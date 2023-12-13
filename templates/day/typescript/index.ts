import { resolve } from 'node:path'
import { readFile } from 'node:fs/promises'

async function main() {
  let data = await readFile(
    resolve('../../../../', 'data', '{{YEAR}}-{{DAY}}.txt'),
    'utf8'
  )

  // Part 1
  {
    console.time('Part 1')
    let result = part1(data)
    console.log('Result:', result)
    console.timeEnd('Part 1')
  }

  // Part 2
  {
    console.time('Part 2')
    let result = part2(data)
    console.log('Result:', result)
    console.timeEnd('Part 2')
  }
}

main()

export function part1(data: string) {}

export function part2(data: string) {}
