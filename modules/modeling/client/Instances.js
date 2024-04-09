const singleInstanceOptions = { singleInstance: true }
const arrayInstances = []

const loop = () => {
  for (const instances of arrayInstances) {
    instances.checkDuplicates()
  }
  //setTimeout(loop, 1000)
}

loop()


module.exports = class Instances extends Array {
  constructor(type) {
    super()
    this.type = type
  }

  checkDuplicates() {
    for (const i of this) {
      for (const j of this) {
        if (i === j) { continue }
        if (i.equals(j)) {
          console.log('equals', i.toJSON(), j.toJSON())
          Object.assign(i, j)
          j.tranform(i)
          console.info('Transformation completed', i, j)
        }
      }
    }
  }

  getInstance(json) {
    let model = this.find((m) => m._id === json._id)
    if (!model) {
      model = this.type.parse({
        '@type': json['@type']
      })
      model.set(json, singleInstanceOptions)
      model.on('destroyed', () => this.onInstanceDestroyed(model))
      this.push(model)
      //this.checkDuplicates()
    } else {
      model.set(json, singleInstanceOptions)
    }

    return model
  }

  onInstanceDestroyed(instance) {
    const index = this.indexOf(instance)
    if (index !== -1) {
      this.splice(index, 1)
    }
  }
}