const Array = require('core/types/Array')

const array = new Array()

array.on('indexDeleted', (index) => {
  console.log('indexDeleted', index)
})


array.on('indexSet', (index, value, oldValue) => {
  console.log('indexSet', index, value, oldValue)
})

array.push(1, 2, 3, 4, 5, 6, 7, 8, 9)
console.log()
array.splice(2,1)
return
array.sort((a, b) => b - a)


const a = 1
const s = Symbol('a')
a[s] = {}
console.log(a[s])