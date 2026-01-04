#!/usr/bin/env node

'use strict'

const { red } = require('picocolors')
const fs = require('fs-extra')
const path = require('path')

const rootPkg = require('../package.json')

require('update-notifier')({ pkg: rootPkg }).notify()

const cli = require('meow')({
  pkg: rootPkg,
  help: fs.readFileSync(path.resolve(__dirname, '..', 'README.md'), 'utf-8'),
  flags: {
    cwd: {
      type: 'string',
      default: process.cwd()
    },
    tokens: {
      type: 'boolean',
      default: false
    }
  }
})

const processError = error =>
  console.log(red(error.message || error)) || process.exit(1)

if (cli.flags.tokens) {
  require('./tokens')(cli.flags).catch(processError)
} else {
  require('./init')(cli.flags).catch(processError)
}
