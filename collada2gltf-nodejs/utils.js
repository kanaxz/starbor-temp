const child_process = require('child_process')

const execFile = async (...args) => {
  return new Promise((resolve, reject) => {
    child_process.execFile(...args, (err, stdout, stderr) => {
      if (err || stderr) {
        return reject(err || stderr)
      }
      resolve(stdout)
    })
  })
}

module.exports = {
  execFile,
}