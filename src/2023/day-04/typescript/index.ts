import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

async function main() {
  const data = await readFile(
    resolve('../../../../', 'data', '2023-04.txt'),
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
    .map((line) => {
      const cards = line.split(': ')[1]
      const [_win, _my] = cards.split(' | ')
      const win = _win.split(' ')
      const my = _my.split(' ')

      const count = my.reduce(
        (a, c) => (win.find((j) => c.trim() === j.trim()) ? a + 1 : a),
        0
      )

      const sum = count > 0 ? 2 ** (count - 1) : 0

      return sum
    })
    .reduce((a, c) => a + c, 0)
}

export function part2(data: string) {
  const lines = data.trim().split('\n')

  const map: Map<number, { points: number; copies: number }> = new Map()

  let sum = 0

  lines.map((line) => {
    const [game, cards] = line.split(': ')
    const gameID = Number(game.replace('Card', '').trim())

    const points = getCardPoints(cards)

    map.set(gameID, {
      copies: 1,
      points
    })
  })

  lines.map((line) => {
    const [game, cards] = line.split(': ')
    const gameID = Number(game.replace('Card', '').trim())

    //@ts-ignore
    const { copies, points } = map.get(gameID)

    sum += copies

    for (let i = gameID + 1; i <= gameID + points; i++) {
      const v = map.get(i)

      if (v) {
        map.set(i, {
          ...v,
          copies: v.copies + copies
        })
      }
    }
  })

  return sum
}

function getCardPoints(cards: string) {
  const [_win, _my] = cards.split(' | ')
  const win = _win.split(' ')
  const my = _my.split(' ')

  return my.reduce(
    (a, c) => (win.find((j) => c.trim() === j.trim()) ? a + 1 : a),
    0
  )
}
