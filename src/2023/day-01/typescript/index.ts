import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

async function main() {
  const data = await readFile(
    resolve('../../../../', 'data', '2023-01.txt'),
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

export function part1(file: string) {
  const lines = file.trim().split('\n')
  let sum = 0

  for (const line of lines) {
    let i = 0
    let j = line.length - 1

    while (i <= j) {
      if (!Number.isNaN(Number(line[i])) && !Number.isNaN(Number(line[j]))) {
        break
      }
      if (Number.isNaN(Number(line[i]))) {
        ++i
      }
      if (Number.isNaN(Number(line[j]))) {
        --j
      }
    }

    sum += parseInt(Number(line[i]) * 10 + line[j])
  }

  return sum
}

export function part2(data: string) {
  const lines = data.trim().split('\n')
  let sum = 0

  enum words {
    zero = 0,
    one = 1,
    two = 2,
    three = 3,
    four = 4,
    five = 5,
    six = 6,
    seven = 7,
    eight = 8,
    nine = 9
  }

  for (const line of lines) {
    // RegEx spoiler alert: You can also write a regex where it sort of starts over instead of continuing where it left off. A bit slower but something like /(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g. Be aware, this doesn't work in Safari - Robin, Discord
    const reg = /(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g

    const res = [...line.matchAll(reg)]

    if (!res.length) {
      throw new Error('No match')
    }

    const f = Number.isNaN(Number(res[0][1]))
      ? words[res[0][1]]
      : parseInt(res[0][1])

    const l = Number.isNaN(Number(res[res.length - 1][1]))
      ? words[res[res.length - 1][1]]
      : parseInt(res[res.length - 1][1])

    sum += f * 10 + l
  }

  return sum
}
