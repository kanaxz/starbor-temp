const express = require('express')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require.main.require('./config')
const http = require('http')
const cors = require('cors')
const { join } = require('path')

module.exports = {
  dependancies: ['app'],
  construct({ app }) {
    const expressApp = express()


    expressApp.use(bodyParser.urlencoded({
      extended: false
    }))

    expressApp.use((req, res, next) => {
      console.log(req.headers)
      next()
    })

    expressApp.use(cors())

    expressApp.use(cookieParser())
    expressApp.use(bodyParser.json())
    expressApp.use((req, res, next) => {
      console.log(req.method, req.url, req.body)
      next()
    })
    const server = http.createServer(expressApp)

    expressApp.get('/ping', (req, res) => {
      res.send('pong')
    })

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