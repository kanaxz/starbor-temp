
const les = {
  'HURSTON': 'EVERUS-HARBOR',
  'ARCCORP': 'BAIJINI-POINT',
  'CRUSADER': 'PORT-OLISAR',
  'MICROTECH': 'PORT-TRESSLER',
}

const otherNames = {
  'Port Olisar': ['Olisar', 'PortO']
}

const key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
  "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
  "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"]

const romanize = (num) => {
  if (isNaN(num))
    return NaN;
  var digits = String(+num).split(""),

    roman = "",
    i = 3;
  while (i--)
    roman = (key[+digits.pop() + (i * 10)] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
}

module.exports = ({ locations }) => {
  const getPlanet = async (name) => {
    let filter = {
      '@type': 'planet',
    }

    if (name.length === 3 && name.toUpperCase() === name) {
      filter.shortName = name
    } else {
      const [systemName, number] = name.split(/(?=[0-9])/)
      filter.designation = `${systemName} ${romanize(parseInt(number))}`
    }
    //console.log(filter)

    const planet = await locations.collection.findOne(filter)
    return planet
  }


  const getName = (name) => {
    const otherName = Object.values(otherNames)
      .find((values) => values.indexOf(name) !== -1)
    if (otherName) {
      return otherName[0]
    }
    return name
  }


  const findLocation = async (name) => {

    const nameArray = name.split('_')
    if (nameArray.length === 1) {
      name = getName(nameArray[0]).replace(/ /g, '').toUpperCase()
    } else {
      let [planetDesignation, currentDesignation] = nameArray
      const planet = await getPlanet(planetDesignation)
      if (!planet) {
        throw new Error(`Cannot find planet ${planetDesignation} from ${name}`)
      }
      if (currentDesignation === 'LEO1') {
        const location = await locations.collection.findOne({
          _id: les[planet._id]
        })
        return location
      }
      name = `${planet.shortName}${currentDesignation}`
    }
    const pipeline = [
      {
        $match: {
          $expr: {
            $and: [{
              $eq: [name, {
                $toUpper: {
                  $replaceAll: {
                    input: '$name',
                    find: ' ',
                    replacement: '',
                  }
                }
              }]
            }]
          }
        },
      },
      {
        $limit: 1
      }
    ]
    //console.log(JSON.stringify(pipeline, null, ' '))
    const [location] = await (locations.collection.aggregate(pipeline).toArray())

    return location
  }

  return {
    findLocation,
  }
}