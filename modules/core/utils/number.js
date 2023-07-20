const bound = (int, [min, max]) => {
  if (int < min) {
    return min
  }
  if (int > max) {
    return max
  }
  return int
}

module.exports = {
  bound,
}