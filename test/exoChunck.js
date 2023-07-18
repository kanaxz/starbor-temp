const datas = [5, 142, 22, 19, 53, 65, 4, 62, 82, 62, 43, 3, 115, 209, 137]

const sum = [142, 22, 19, 53, 65].reduce((acc, n) => acc + n, 0)

console.log({ sum })

const extractChunks = () => {
  let index = 0
  const chuncks = []

  while (index < datas.length - 1) {
    const length = datas[index++]
    let chunck = 0
    const max = index + length
    while (index < max) {
      chunck += datas[index++]
    }
    console.log({ chunck })
    chuncks.push(chunck & 0xFF)
  }

  return chuncks
}

const chuncks = extractChunks()
console.log({ chuncks })



