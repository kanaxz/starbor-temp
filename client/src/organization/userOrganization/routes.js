const navigator = require('@app/navigator')

navigator.route('/users-organizations', (req, res) => {
  res.page(import('../organization/userOrganization/pages/usersOrganizations'))
})
