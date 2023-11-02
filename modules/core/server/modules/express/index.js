const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const http = require('http')
const cors = require('cors')
const { join } = require('path')

module.exports = {
  dependancies: ['core', 'config'],
  construct({ core, config }) {
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
    const server = http.createServer(expressApp)

    expressApp.get('/ping', (req, res) => {
      res.send('pong')
    })

    core.onReady(() => {
      console.log(`Listening on port ${config.express.port}`)
      expressApp.use('/*', (req, res) => {
        console.log('here')
        res.sendFile(join(config.dist, 'index.html'))
      })
      server.listen(config.express.port)
    })

    return expressApp
  }
}