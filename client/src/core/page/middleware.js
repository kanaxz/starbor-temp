module.exports = (presenter) => {
  return async (req, res, next) => {
    res.page = async (pageImport, ...args) => {
      const pageModule = await pageImport
      const pageClass = pageModule.default
      const page = new pageClass(...args)
      await presenter.display(page)
    }
    next()
  }
}
