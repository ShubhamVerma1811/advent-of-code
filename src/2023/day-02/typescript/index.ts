import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const config = {
  red: 12,
  green: 13,
  blue: 14
}

async function main() {
  const data = await readFile(
    resolve('../../../../', 'data', '2023-02.txt'),
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

  return lines
    .map((line: string) => {
      return line
        .split(': ')[1]
        .split('; ')
        .map((set) => {
          const pulls = set.split(', ')
          return pulls.every((s) => {
            const [n, col] = s.split(' ')
            return config[col] >= Number(n)
          })
        })
        .every((p) => p)
    })
    .reduce((a, c, i) => {
      return c ? a + i + 1 : a
    }, 0)
}

export function part2(data: string) {
  const lines = data.trim().split('\n')

  return lines
    .map((line: string) => {
      const max = {
        red: 0,
        green: 0,
        blue: 0
      }
      line
        .split(': ')[1]
        .split('; ')
        .map((set) => {
          const pulls = set.split(', ')
          return pulls.map((c) => {
            const [n, col] = c.split(' ')
            max[col] = Math.max(max[col], Number(n))
          })
        })

      return max
    })
    .reduce((a, c, i) => {
      return (a += c.blue * c.green * c.red)
    }, 0)
}
