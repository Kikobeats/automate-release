#!/usr/bin/env node

'use strict'

const { get, forEach, set } = require('lodash')
const { white, red, gray } = require('chalk')
const existsFile = require('exists-file')
const jsonFuture = require('json-future')
const link = require('terminal-link')
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

const install = async ({ cwd }) => {
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
      'devDependencies.@commitlint/cli',
      'devDependencies.@commitlint/config-conventional',
      'devDependencies.ci-publish',
      'devDependencies.conventional-github-releaser',
      'devDependencies.finepack',
      'devDependencies.git-authors-cli',
      'devDependencies.husky',
      'devDependencies.lint-staged',
      'devDependencies.npm-check-updates',
      'devDependencies.standard-version',
      'husky.hooks.commit-msg',
      'husky.hooks.pre-commit',
      'scripts.contributors',
      'scripts.postinstall',
      'scripts.postrelease',
      'scripts.prerelease',
      'scripts.release:github',
      'scripts.release:tags',
      'scripts.release',
      'scripts.update:check',
      'scripts.update',
      ['lint-staged', 'package.json']
    ],
    key => {
      const value = get(rootPkg, key)
      set(pkg, key, value)
    }
  )

  jsonFuture.save(pkgPath, pkg)
  await fs.copy(path.resolve(__dirname, '../.travis.yml'), '.travis.yml')
  await fs.copy(path.resolve(__dirname, '../.husky'), '.husky')

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
          'Travis',
          'https://docs.travis-ci.com/user/environment-variables#defining-variables-in-repository-settings'
        )
      )}:`
    )
  )
  console.log()
  console.log(
    gray(
      `   - \`${white(
        link(
          'GH_TOKEN',
          'https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/'
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
  console.log(
    gray(
      `   - \`${white(
        link(
          'CONVENTIONAL_GITHUB_RELEASER_TOKEN',
          'https://github.com/conventional-changelog/releaser-tools/tree/master/packages/conventional-github-releaser#setup-token-for-cli'
        )
      )}\``
    )
  )
  console.log()
  console.log(gray(` Perform an \`${white('npm install')}\` to finish it.`))
}

install(cli.flags).catch(processError)
