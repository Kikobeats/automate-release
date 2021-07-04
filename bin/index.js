#!/usr/bin/env node

'use strict'

const { red } = require('chalk')
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
    }
  }
})

const processError = err => {
  console.log(red(err.message || err))
  process.exit(1)
}

require('install')(cli.flags).catch(processError)
