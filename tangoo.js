import * as fs from 'node:fs'
import { parse } from 'csv-parse/sync'
import arrayShuffle from 'array-shuffle'
import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

function readCsv(filename)
{
  const csv = fs.readFileSync(filename, 'utf8')
  const words = parse(csv, {columns: true})
    .filter(word => word.complete !== '1')
  return arrayShuffle(words)
}

async function question(words)
{
  const rl = readline.createInterface({input, output})

  for (let i in words) {
    const string = await rl.question(`${words[i].en} ? `)
    console.log(words[i].ja)
  }

  rl.close()
}

const words = readCsv('words.csv')
question(words)
