import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

async function main() {
  const data = await readFile(
    resolve('../../../../', 'data', '2023-05.txt'),
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
  const lines = data.trim().split('\n\n')

  const seeds = lines[0]
    ?.split('seeds: ')[1]
    ?.trim()
    ?.split(' ')
    .map((i) => +i)

  const categories: Record<string, Array<Array<number>>> = {}

  lines?.slice(1).map((line) => {
    const [category, ...rest] = line.split('\n')

    const name = category?.split('map:').join('').trim()

    const maps = rest?.map((i) =>
      i
        .trim()
        .split(' ')
        .map((i) => +i)
    )

    categories[name] = maps
  })

  const res = seeds.map((seed) => {
    let curr = seed
    const ent = Object.entries(categories)
    for (const [_, maps] of ent) {
      const map = maps.find((map) => map[1] <= curr && curr <= map[1] + map[2])

      if (map) {
        const diff = map[1] - map[0]
        curr = curr - diff
      }
    }

    return curr
  })

  return Math.min(...res)
}

export function part2(data: string) {}
