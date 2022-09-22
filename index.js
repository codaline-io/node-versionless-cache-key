const core = require('@actions/core')
const fs = require('fs')
const crypto = require('crypto')
const path = require('path')

try {
  const packagePath = core.getInput('packageJSON')
  const lockPath = core.getInput('packageLockJSON')
  const jsonPackageFile = JSON.parse(fs.readFileSync(path.resolve(process.env.GITHUB_WORKSPACE, packagePath || 'package.json')))
  const regexp = new RegExp(`"name":"${jsonPackageFile.name}","version":".*?",`, 'g')
  const jsonLockFile = fs.readFileSync(path.resolve(process.env.GITHUB_WORKSPACE, lockPath || 'package-lock.json')).toString(('utf-8')).replace(/\n|\s|\r|\t/g, '').replace(regexp, '')
  console.log(jsonLockFile.slice(0, 250))
  core.setOutput('cacheKey', crypto.createHash('sha256').update(jsonLockFile, 'utf8').digest('hex'));
} catch (error) {
  core.setFailed(error.message);
}
