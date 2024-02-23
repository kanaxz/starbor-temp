
const setup = {
  layout: {
    header: {
      before: []
    }
  },
  types: [],
  actions: [
    {
      name: 'explorer',
      url: '/explorer',
      content: '<i class="fa-solid fa-list"></i>',
      async execute(req, res, next) {
        await res.page(import('./pages/Explorer'), req.model)
      }
    },
    {
      name: 'edit',
      url: '/edit',
      content: '<i class="fa-solid fa-pen"></i>',
      async check(model) {
        await model.canUpdate()
        return true
      },
      async execute(req, res, next) {
        await res.page(import('./pages/Edit'), req.model)
      }
    },
    {
      name: 'delete',
      content: '<i class="red fa-solid fa-trash"></i>',
      class: 'warning',
      async check(model) {
        await model.canDelete()
        return true
      },
      async execute(model) {
        await model.delete()
      }
    }
  ]
}

module.exports = setup