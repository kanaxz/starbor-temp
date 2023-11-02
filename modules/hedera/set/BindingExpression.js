const BindingFunction = require('./BindingFunction')

const expressionRegex = /{{.*?}}/g

module.exports = class BindingExpression {
  constructor(expression, variables, callback) {
    this.expression = expression
    this.variables = variables
    this.callback = callback
    this.functions = []
    this.update()
  }

  update() {
    let value = this.expression
    this.destroy()
    this.functions = this.expression.match(expressionRegex)
      .map((path) => {

        const sanitizePath = path.replace('{{', '').replace('}}', '')
        const bindingFunction = new BindingFunction(sanitizePath, this.variables, () => {
          this.update()
        }, false)

        value = value.replace(path, bindingFunction.getValue())
        return bindingFunction
      })

    this.expression.match(expressionRegex)
    this.callback(value)
  }

  destroy() {
    this.functions.forEach((p) => p.destroy())
  }
}
