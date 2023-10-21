const bcrypt = require('bcrypt')
const saltRounds = 10;

const encryptPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds)
}

const matchPassword = async (password, encryptedPassword) => {
  return await bcrypt.compare(password, encryptPassword)
}

module.exports = {
  encryptPassword,
  matchPassword
}
