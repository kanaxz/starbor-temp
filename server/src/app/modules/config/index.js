const { join } = require('path')
module.exports = {
  construct() {
    const root = join(__dirname, '../../../..')
    return {
      root,
      dist: join(root, './dist'),
      management: {
        systemUser: {
          username: 'system',
          password: '123',
          wiki: 'abc',
        }
      },
      express: {
        port: 8000,
      },
      mongo: {
        url: 'mongodb://127.0.0.1:27018/',
        db: 'star-citizen-universe'
      },
    }
  }
}