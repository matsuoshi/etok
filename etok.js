import fs from 'node:fs'
import { parse } from 'csv-parse/sync'
import arrayShuffle from 'array-shuffle'
import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

function readCsv(filename) {
  const csv = fs.readFileSync(filename, 'utf8')
  const words = parse(csv, {
      columns: true,
      relax_column_count: true,
    })
    .filter(word => word.complete !== '1')
  return arrayShuffle(words)
}

async function question(words) {
  const rl = readline.createInterface({ input, output })

  for (const word of words) {
    const reply = await rl.question(`${word.question} ? `)
    if (reply === 'q') {
      break
    }
    console.log(word.answer)
  }

  rl.close()
}

(function main() {
  const words = readCsv('words.csv')
  question(words)
})()
