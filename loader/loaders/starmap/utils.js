const axios = require('axios')

const baseUrl = 'https://robertsspaceindustries.com/api/starmap/'

const latlongxy = {
  latitude: 'x',
  longitude: 'y'
}

const gePositionFromLatLon = (planet) => {
  return Object.entries(latlongxy)
    .reduce((acc, [latlon, axis]) => {
      acc[axis] = parseFloat(planet[latlon])
      return acc
    }, {})
}

const starmapRequest = async (url) => {
  console.log(url)
  const systemResult = await axios.post(baseUrl + url)
  return systemResult.data.data
}


module.exports = {
  starmapRequest,
  latlongxy,
  gePositionFromLatLon,
}