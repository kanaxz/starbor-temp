const codify = (string) => string.replace(/[,'\.()]/g, '').split(' ').map((s) => s.toUpperCase()).join('-')

module.exports = {
  codify,
}