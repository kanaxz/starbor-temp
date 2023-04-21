const navigator = require('@app/navigator')

navigator.route(/\/location\/(.*)/, (req, res) => {
  const [locationId] = req.params[0]
  res.page(import('./pages/Location'), locationId)
})

navigator.route('/locations', (req, res) => {
  res.page(import('./pages/Locations'))
})