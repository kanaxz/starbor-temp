const codify = (string) => {
  const codified = string.normalize('NFD').replace(/([^\w ])+/g, '-').split(' ').map((s) => s.toUpperCase()).join('-')
  return codified
}

module.exports = {
  codify,
}