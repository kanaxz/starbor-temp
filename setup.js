const { exec, execSync } = require('child_process')
const fs = require('fs')
const { join } = require('path')

console.info(process.cwd(), __dirname)
const processed = []
const filePrefix = 'file:'

const processFolder = (path) => {
  if (processed.indexOf(path) !== -1) { return }

  const packagePath = join(path, 'package.json')
  const hasPackage = fs.existsSync(packagePath)
  if (!hasPackage) { return }

  const package = require(packagePath)
  const dependencies = [package.dependencies, package.devDependencies]
    .filter((o) => o)
    .flatMap((o) => Object.values(o))
    .filter((d) => d.startsWith(filePrefix))
  for (const dependency of dependencies) {
    const [, dependencyRelativePath] = dependency.split(':')
    const dependencyPath = join(path, dependencyRelativePath)
    processFolder(dependencyPath)
  }
  console.info({ path })
  execSync(`cd ${path} && npm i`)
  processed.push(path)
}

const start = () => {
  const root = __dirname
  const folders = fs
    .readdirSync(root, { withFileTypes: true })
    .filter((o) => o.isDirectory())

  folders.forEach(({ name }) => {
    processFolder(join(root, name))
  })
}

start()