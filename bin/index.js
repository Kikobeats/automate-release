#!/usr/bin/env node

'use strict'

const { get, forEach, set } = require('lodash')
const { white, red, gray } = require('chalk')
const existsFile = require('exists-file')
const jsonFuture = require('json-future')
const path = require('path')
const fs = require('fs')

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

const install = async ({ cwd }) => {
  const pkgPath = path.join(cwd, 'package.json')

  if (!await existsFile(pkgPath)) {
    return processError({
      message: 'First, you need to initialize `package.json`.'
    })
  }

  const pkg = require(pkgPath)

  forEach(
    [
      'scripts.postrelease',
      'scripts.release',
      'scripts.prerelease',
      'scripts.release:github',
      'scripts.release:tags',
      'scripts.update',
      'scripts.update:check',
      'commitlint.extends',
      'husky.hooks.commit-msg',
      'husky.hooks.pre-commit',
      ['lint-staged', 'linters', 'package.json'],
      'standard-version.scripts.prechangelog',
      'devDependencies.@commitlint/cli',
      'devDependencies.@commitlint/config-conventional',
      'devDependencies.conventional-github-releaser',
      'devDependencies.finepack',
      'devDependencies.git-authors-cli',
      'devDependencies.husky',
      'devDependencies.lint-staged'
    ],
    key => {
      const value = get(rootPkg, key)
      set(pkg, key, value)
    }
  )

  jsonFuture.save(pkgPath, pkg)
  console.log()
  console.log(gray(` ${white('automatic-release')} installed 🎉`))
  console.log()
  console.log(gray(` Perform an \`${white('npm install')}\` to finish it.`))
  console.log()
  console.log(
    gray(
      ` Remember to declare \`${white('CONVENTIONAL_GITHUB_RELEASER_TOKEN')}\`.`
    )
  )

  console.log(gray(` See how to: ${white('https://git.io/fxRUv')}`))
}

install(cli.flags).catch(processError)
