/*
class Model {
  constructor() {

  }
}

class User extends Model {
  constructor(firstName, lastName) {
    super({
      firstName,
      lastName
    })
    this.firstName = firstName
    this.lastName = lastName
  }
}

const sacha = new User('Sacha', 'Perret')

sacha.firstName
sacha.lastName
/**/


const users = [
  {
    firstName: 'sacha',
    group: 'le meilleur',
  },
  {
    firstName: 'Albane',
    group: 'les moins biens',
  },
  {
    firstName: 'Cédric',
    group: 'les moins biens',
  }
]
/*
const [sacha, albane, cedric] = users
const usersAsObject = {
  sacha,
  albane,
  cedric
}
*/

const result = users
  .reduce((groups, user) => {
    let group = groups[user.group]
    if (!group) {
      group = {
        value: user.group,
        users: []
      }

      groups[group.value] = group
    }

    group.users.push(user)
    return groups
  }, {})

const stringied = JSON.stringify(result, null, ' ')
console.log(stringied)

const user = {
  firstName: 'Cédric',
  lastName: 'dessalles'
}

const entries = Object.entries(user)

const entry = entries
  .find(([propertyName, propertyValue]) => {
    return propertyName === 'firstName'
  })

console.log(entries, entry)
