const { Jwt } = require('jwt')
const { writeFile } = require('fs/promises')
const { join } = require('path')
module.exports = async (context, config) => {
  const jwt = await Jwt.collection.create(context, {
    '@type': 'jwt',
    name: 'system jwt',
    user: context.user,
  })
  await writeFile(join(config.root, '../jwt.json'), JSON.stringify(jwt.toJSON(), null,' ' ))
}