
class Model {

}

const otherClassMixin = (base) => {
  return class OtherClass extends base {

  }
}

const otherClassMixin2 = (base) => {
  return class OtherClass extends base {

  }
}

class User extends otherClassMixin2(otherClassMixin(Model)) {

}

class Group extends otherClassMixin(Model) {

}

const user = new User()
const isUser = user instanceof User
const isModel = user instanceof Model
const isOtherClass = user instanceof otherClassMixin