
const deepRequest = () => {
  console.log('dr', 1)
  console.log('dr', 2)
  return []
}

const request = () => {
  const result = deepRequest()
  throw new Error('Forbidden')
  return result
}

const start = () => {
  let users
  try {
    users = request('/users')
  } catch (err) {
    users = null
    throw err
  } finally {
    console.log({ users })
  }
}

start()