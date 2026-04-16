import fs from 'fs'
import crypto from 'crypto'
import path from 'path'
import * as core from '@actions/core'

try {
  const packagePath = core.getInput('packageJSON')
  const lockPath = core.getInput('packageLockJSON')
  const jsonPackageFile = JSON.parse(fs.readFileSync(path.resolve(process.env.GITHUB_WORKSPACE!, packagePath || 'package.json'), 'utf-8'))
  const regexp = new RegExp(`"name":"${jsonPackageFile.name}","version":".*?",`, 'g')
  const jsonLockFile = fs.readFileSync(path.resolve(process.env.GITHUB_WORKSPACE!, lockPath || 'package-lock.json')).toString(('utf-8')).replace(/\n|\s|\r|\t/g, '').replace(regexp, '')

  core.setOutput('cacheKey', crypto.createHash('sha256').update(jsonLockFile, 'utf8').digest('hex'));
} catch (error: unknown) {
  core.setFailed((error as Error)?.message);
}
