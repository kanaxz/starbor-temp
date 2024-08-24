const axios = require('axios')
const fs = require('fs')
const baseUrl = 'https://robertsspaceindustries.com/api/starmap/'
const { makeId } = require('sools-core/utils/string')
const { Readable } = require('stream')
const { finished } = require('stream/promises')
const { join } = require('path')
const { mkdir } = require('fs/promises')
const { Position3D } = require('starbor')

const tempFolder = join(__dirname, 'temp')

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
  //console.log(url)
  const systemResult = await axios.post(baseUrl + url)
  return systemResult.data.data
}

const loadUrl = async (url) => {
  const filePath = join(tempFolder, makeId())
  if (!fs.existsSync(tempFolder)) {
    await mkdir(tempFolder)
  }
  const fetchRes = await fetch(url)
  const fileStream = fs.createWriteStream(filePath, { flags: 'wx' })
  await finished(Readable.fromWeb(fetchRes.body).pipe(fileStream))
  return filePath
}

const getSystemPosition = (object) => {
  const values = ['x', 'y', 'z'].reduce((acc, axis) => {
    acc[axis] = parseFloat(object[`position_${axis}`])
    return acc
  }, {})

  return new Position3D(values)
}



module.exports = {
  starmapRequest,
  latlongxy,
  gePositionFromLatLon,
  loadUrl,
  tempFolder,
  getSystemPosition,
}