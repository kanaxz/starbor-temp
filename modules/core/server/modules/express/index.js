const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const https = require('https')
const cors = require('cors')
const { join } = require('path')
const helmet = require('helmet')

module.exports = {
  dependencies: ['core'],
  construct({ core }, config) {
    const expressApp = express()

    expressApp.use((req, res, next) => {
      next()
    })

    expressApp.use(cors())

    expressApp.use(cookieParser())
    expressApp.use(bodyParser.json())
    expressApp.use(bodyParser.urlencoded({ extended: false }))

    expressApp.use((req, res, next) => {
      console.log(req.method, req.url, JSON.stringify(req.body, null, ' '))
      next()
    })
    const server = https.createServer({
      ...config.express.options
    }, expressApp)

    expressApp.get('/ping', (req, res) => {
      res.send('pong')
    })
    expressApp.use(express.static(config.dist))

    core.on('ready', () => {
      console.log(`Listening on port ${config.express.port}`)
      expressApp.use('/*', (req, res) => {
        res.sendFile(join(config.dist, 'index.html'))
      })
      server.listen(config.express.port)
    })

    return expressApp
  }
}