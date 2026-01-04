#!/usr/bin/env node

'use strict'

const createSecret = require('github-create-secret')
const { createSpinner } = require('nanospinner')

const dotenv = require('dotenv')
const $ = require('tinyspawn')
const fs = require('fs-extra')
const path = require('path')

const parseEnvrc = envrcPath => {
  if (!fs.existsSync(envrcPath)) {
    throw new Error(`.envrc file not found at ${envrcPath}`)
  }

  const content = fs.readFileSync(envrcPath, 'utf-8')
  // Convert .envrc format (export KEY=VALUE) to .env format (KEY=VALUE)
  const envContent = content
    .split('\n')
    .map(line => {
      const trimmed = line.trim()
      if (trimmed.startsWith('export ')) {
        return trimmed.replace(/^export\s+/, '')
      }
      return trimmed
    })
    .filter(line => line && !line.startsWith('#'))
    .join('\n')

  return dotenv.parse(envContent)
}

const getRepositoryInfo = async cwd => {
  const pkgPath = path.join(cwd, 'package.json')

  if (fs.existsSync(pkgPath)) {
    const pkg = require(pkgPath)
    if (pkg.repository && pkg.repository.url) {
      const url = pkg.repository.url
      const match = url.match(/github\.com[/:]([^/]+)\/([^/]+)(?:\.git)?/)
      if (match) {
        return {
          owner: match[1],
          repo: match[2].replace(/\.git$/, '')
        }
      }
    }
  }

  const { stdout: remoteUrl } = await $('git config --get remote.origin.url', {
    cwd,
    stdio: ['ignore', 'pipe', 'ignore'],
    reject: false
  })
  const match = remoteUrl.match(/github\.com[/:]([^/]+)\/([^/]+)(?:\.git)?/)
  if (match) {
    return {
      owner: match[1],
      repo: match[2].replace(/\.git$/, '')
    }
  }
}

module.exports = async ({ cwd } = {}) => {
  const workingDir = cwd || process.cwd()
  const envrcPath = path.join(workingDir, '.envrc')
  const tokens = parseEnvrc(envrcPath)
  const { owner, repo } = await getRepositoryInfo(workingDir)

  for (const [name, value] of Object.entries(tokens)) {
    const text = `Set ${name}`

    const spinner = createSpinner(text).start()
    await createSecret({
      name,
      owner,
      repo,
      token: process.env.GH_TOKEN,
      upsert: true,
      value
    })
    spinner.success()
  }
}
