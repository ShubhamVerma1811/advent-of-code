import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

async function main() {
  const data = await readFile(
    resolve('../../../../', 'data', '2023-06.txt'),
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
  const lines = data.trim().split('\n')

  const times = lines[0]
    .split(/\s+/)
    .slice(1)
    .map((i) => +i)

  const distance = lines[1]
    .split(/\s+/)
    .slice(1)
    .map((i) => +i)

  return times
    .map((time, idx) => {
      const sum: number[] = []
      for (let i = 0; i <= time; i++) {
        const x = time
        const y = x - i

        if (y * i > distance[idx]) {
          sum.push(i)
        }
      }

      return sum
    })
    .reduce((a, c) => a * c.length, 1)
}

export function part2(data: string) {
  const lines = data.trim().split('\n')
  const times = +lines[0].split('Time:')[1].replace(/\s+/g, '')
  const distance = +lines[1].split('Distance:')[1].replace(/\s+/g, '')

  let i = 0
  let sum = 0

  while (i <= times) {
    const x = times
    const y = x - i

    if (y * i > distance) {
      sum += 1
    }

    i++
  }

  return sum
}
