module.exports = (presenter) => {
  return async (req, res, next) => {
    res.page = async (pageImport) => {
      const pageModule = await pageImport
      const pageClass = pageModule.default
      const page = new pageClass()
      await presenter.display(page)
    }
    next()
  }
}
