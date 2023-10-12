const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const http = require('http')
const cors = require('cors')
const { join } = require('path')

module.exports = {
  dependancies: ['app', 'config'],
  construct({ app, config }) {
    const expressApp = express()

    expressApp.use((req, res, next) => {
      next()
    })

    expressApp.use(cors())

    expressApp.use(cookieParser())
    expressApp.use(bodyParser.json())
    expressApp.use(bodyParser.urlencoded())

    expressApp.use((req, res, next) => {
      console.log(req.method, req.url, JSON.stringify(req.body, null, ' '))
      next()
    })
    const server = http.createServer(expressApp)

    expressApp.get('/ping', (req, res) => {
      res.send('pong')
    })

    app.onReady(() => {
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