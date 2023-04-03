const express = require('express')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require.main.require('./config')
const http = require('http')

module.exports = {
  dependancies: ['app'],
  construct({ app }) {
    const expressApp = express()

    expressApp.set('view engine', 'html');
    expressApp.use(bodyParser.json())
    expressApp.use(bodyParser.urlencoded({
      extended: true
    }))
    expressApp.use(cookieParser())

    const server = http.createServer(expressApp)

    app.onReady(() => {
      console.log(`Listening on port ${config.express.port}`)
      expressApp.use('/*', (req, res) => {
        res.sendFile(join(config.dist, 'index.html'))
      })
      server.listen(config.express.port)
    })

    return expressApp
  }
}