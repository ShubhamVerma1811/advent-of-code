import { promises } from 'fs'
import { resolve } from 'path'
import { part1, part2 } from '.'

const data = promises.readFile(
  resolve(process.cwd(), 'data', '2023-02.txt'),
  'utf8'
)

describe('Part 1', () => {
  it.each([
    [
      `

      `,
      'TODO'
    ]
  ])('should produce the correct value for example %#', (input, expected) => {
    expect(part1(input)).toBe(expected)
  })

  it.skip('should produce the correct value for the input data', async () => {
    expect(part1(await data)).toMatchInlineSnapshot()
  })
})

describe.skip('Part 2', () => {
  it.each([
    [
      `

      `,
      'TODO'
    ]
  ])('should produce the correct value for example %#', (input, expected) => {
    expect(part2(input)).toBe(expected)
  })

  it.skip('should produce the correct value for the input data', async () => {
    expect(part2(await data)).toMatchInlineSnapshot()
  })
})
