#!/usr/bin/env node

'use strict'

const fetch = require('node-fetch')
const readline = require('readline')
const fs = require('fs')

const URL = 'https://replicate.npmjs.com/_all_docs'
const OUT = process.argv[2]

/*

will give us:
{"total_rows":1195496,"offset":0,"rows":[
{"id":"0","key":"0","value":{"rev":"1-5fbff37e48e1dd03ce6e7ffd17b98998"}},
{"id":"0-","key":"0-","value":{"rev":"1-420c8f16ec6584c7387b19ef401765a4"}},

we filter all rows out that start with {"id, parse out the id and write it to a file

*/

async function main() {
const stream = await fetch(URL)
const out = fs.createWriteStream(OUT)

const rl = readline.createInterface({
  input: stream
})

rl.on('line', (line) => {
  if (line.startsWith('{"id')) {
    id = JSON.parse(line.match(/({.+}),/mi)[1]).id
    out.write(id + '\n')
  }
})

rl.on('close', () => {
  out.end()
})
}

main().catch(console.error)
