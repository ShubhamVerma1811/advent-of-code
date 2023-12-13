import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

async function main() {
  const data = await readFile(
    resolve('../../../../', 'data', '2023-08.txt'),
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
  const lines = data
    .trim()
    .split('\n')
    .map((line) => line.trim())

  const dir = lines[0]
  let i = 0
  let steps = 0
  let curr = 'AAA'

  const graph = lines.slice(2).reduce(
    (acc, curr) => {
      const [n, w] = curr.split(' = ')

      acc[n] = w.replace('(', '').replace(')', '').trim().split(', ')
      return acc
    },
    {} as Record<string, Array<string>>
  )

  while (curr !== 'ZZZ') {
    if (dir[i] === 'R') {
      curr = graph[curr][1]
    } else {
      curr = graph[curr][0]
    }

    steps++
    i = i === dir.length - 1 ? 0 : i + 1
  }

  return steps
}

export function part2(data: string) {}
