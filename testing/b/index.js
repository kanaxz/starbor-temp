const a = require('a')
const fs = require('fs')

const dirs = fs.readdirSync('./node_modules/a/modules')
dirs.forEach((dir) => {
  if (dir.endsWith('.js')) {
    require('./node_modules/a/modules/' + dir)
  }

})
console.log({ dirs })