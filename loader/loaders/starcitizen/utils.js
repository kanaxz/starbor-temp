const parser = require('xml2json')
const fs = require('fs')

const getRoot = (object) => Object.values(object)[0]

const getFileRoot = (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const json = JSON.parse(parser.toJson(fileContent))
  const [key] = Object.keys(json)
  const [, className] = key.split('.')
  return [className, json[key]]
}

const parseBool = (string) => {
  return string === "1"
}

const nullRef = '00000000-0000-0000-0000-000000000000'

module.exports = {
  parseBool,
  getFileRoot,
  getRoot,
  nullRef,
}
