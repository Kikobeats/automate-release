'use strict'

const install = require('../bin/init')
const test = require('ava')

test("throw an error if package.json doesn't exist", async t => {
  const error = await t.throwsAsync(install())
  t.is(error.name, 'TypeError')
})
