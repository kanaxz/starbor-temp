const navigator = require('@app/navigator')

navigator.route(/\/$/, (req, res) => {
  res.page(import('./pages/Home'))
})

navigator.route('/not-found', (req, res) => {
  res.page(import('./pages/NotFound'))
})

navigator.route('/market', (req, res) => {
  res.page(import('./pages/Market'))
})


navigator.use((req, res) => {
  navigator.navigate('/not-found')
})