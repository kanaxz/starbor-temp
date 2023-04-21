const express = require('express')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require.main.require('./config')
const http = require('http')
const cors = require('cors')

module.exports = {
  dependancies: ['app'],
  construct({ app }) {
    const expressApp = express()

    expressApp.set('view engine', 'html');

    expressApp.use(bodyParser.urlencoded({
      extended: false
    }))
    expressApp.use(cors({
      origin: 'http://localhost:8081',
    }))
    expressApp.use(bodyParser.json())
    expressApp.use(cookieParser())
    expressApp.use((req, res, next) => {
      console.log(req.method, req.url, req.body)
      next()
    })
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