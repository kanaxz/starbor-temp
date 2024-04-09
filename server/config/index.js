const { join } = require('path')
const fs = require('fs')

const root = join(__dirname, '..')
module.exports = {
  root,
  dist: join(root, './.dist'),
  management: {
    systemUser: {
      username: 'system',
      password: '123',
      wiki: 'abc',
    }
  },
  express: {
    port: 7001,
    options: {
      rejectUnauthorized: false,
      key: fs.readFileSync(join(root, './certificate/key.pem')),
      cert: fs.readFileSync(join(root, './certificate/cert.pem')),
      //ca: fs.readFileSync(join(root, '../certificate/Starbor-RootCA.crt'), 'utf-8'),
    }
  },
  mongo: {
    url: 'mongodb://127.0.0.1:27018/',
    db: 'star-citizen-universe'
  },
}
