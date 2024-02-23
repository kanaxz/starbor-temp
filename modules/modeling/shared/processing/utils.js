const objectToFilter = (object) => {
  return Object.entries(object)
    .map(([k, v]) => {
      return {
        $eq: [`$${k}`, v]
      }
    })
}

module.exports = {
  objectToFilter,
}