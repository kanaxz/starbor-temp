
module.exports = {
  construct() {
    process.on('uncaughtException', (err) => {
      // Handle the error safely
      console.log(err)
    })
  }
}