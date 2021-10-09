#!/usr/bin/env node

'use strict'

const { white, red, gray } = require('picocolors')
const { get, forEach, set } = require('lodash')
const existsFile = require('exists-file')
const jsonFuture = require('json-future')
const link = require('terminal-link')
const fs = require('fs-extra')
const path = require('path')

const rootPkg = require('../package.json')

require('update-notifier')({ pkg: rootPkg }).notify()

const processError = err => {
  console.log(red(err.message || err))
  process.exit(1)
}

module.exports = async ({ cwd } = {}) => {
  const pkgPath = path.join(cwd, 'package.json')

  if (!(await existsFile(pkgPath))) {
    return processError({
      message: 'First, you need to initialize `package.json`.'
    })
  }

  const pkg = require(pkgPath)

  forEach(
    [
      'commitlint.extends',
      'devDependencies',
      'scripts.test',
      'scripts.contributors',
      'scripts.postinstall',
      'scripts.postrelease',
      'scripts.prerelease',
      'scripts.release:github',
      'scripts.release:tags',
      'scripts.release',
      'scripts.update:check',
      'scripts.update',
      'lint-staged',
      'simple-git-hooks'
    ],
    key => {
      const value = get(rootPkg, key)
      set(pkg, key, value)
    }
  )

  jsonFuture.save(pkgPath, pkg)

  await Promise.all([fs.copy(path.resolve(__dirname, '../.github'), '.github')])

  console.log()
  console.log(
    gray(
      ` ${white(
        link(
          'automate-release',
          'https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/'
        )
      )} installed 🎉.`
    )
  )
  console.log()
  console.log(
    gray(
      ` Remember to setup on ${white(
        link(
          'GitHub',
          'https://docs.github.com/en/actions/reference/encrypted-secrets'
        )
      )}:`
    )
  )
  console.log()
  console.log(
    gray(
      `   - \`${white(
        link(
          'GIT_USERNAME',
          'https://docs.github.com/en/get-started/getting-started-with-git/setting-your-username-in-git'
        )
      )}\``
    )
  )
  console.log(
    gray(
      `   - \`${white(
        link(
          'GIT_EMAIL',
          'https://docs.github.com/en/github/setting-up-and-managing-your-github-user-account/managing-email-preferences/setting-your-commit-email-address'
        )
      )}\``
    )
  )
  console.log(
    gray(
      `   - \`${white(
        link('NPM_TOKEN', 'https://github.com/bahmutov/ci-publish#how-to-use')
      )}\``
    )
  )
  console.log()
  console.log(gray(` Perform an \`${white('npm install')}\` to finish it.`))
}
