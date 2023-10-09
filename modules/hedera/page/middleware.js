module.exports = (presenter) => {
  return (req, res, next) => {
    res.page = async (pageImport, ...args) => {
      const pageModule = await pageImport
      const pageClass = pageModule.default
      const page = new pageClass(...args)
      presenter.display(page)
    }
    next()
  }
}
