
const handleError = (res, err) => {
  console.error(err.detail && JSON.stringify(err.detail, null, ' ') || err)
  res.status(500).json({
    message: err.message,
    detail: err.detail,
  })
}

module.exports = {
  handleError
}