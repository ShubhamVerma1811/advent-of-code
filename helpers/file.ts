import fs from 'fs'
import path from 'path'

function loadInput(dir) {
  const filePath = path.join(dir, '/bin/input.txt')
  return fs.readFileSync(filePath).toString()
}

export { loadInput }
