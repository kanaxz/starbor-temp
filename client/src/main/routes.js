const navigator = require('@app/navigator')

navigator.route('/', (req, res) => {
  res.page(import('./Home'))
})

navigator.route('/not-found', (req, res) => {
  res.page(import('./NotFound'))
})

navigator.use((req, res) => {
  console.log('here')
  res.redirect('/not-found')
})