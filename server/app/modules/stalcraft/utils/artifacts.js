const Qualities = {
  ordinary: 100,
  unordinary: 110,
  special: 120,
  rare: 130,
}

const QualitiesArray = Object.entries(Qualities)

const ArtifactTypes = {
  mamaBead: {
    vitality: {
      base: 1,
      qualities: {
        base: {
          bonus: 0.03,
        },
        ordinary: {
          bonus: 0.02,
          potentialBonus: 0.02,
        },
        unordinary: {
          potentialBonus: 0.06,
        },
        special: {
          potentialBonus: 0.07,
        },

      },
    },
    healingEffectiveness: {
      base: 10,
      qualities: {
        base: {
          bonus: 0.2,
        },
        ordinary: {
          bonus: 0.1,
        },
        unordinary: {
          potentialBonus: 0.4
        }
      }
    },
    radiation: {
      base: 0,
      qualities: {
        base: {
          bonus: 0.03,
        },
        ordinary: {
          gapBonus: -0.3
        }
      }
    },
  }
}

const calculateArtifactStats = (artifact) => {
  const artifactType = artifact.type
  const stats = Object.entries(artifactType)
    .map(([statName, stat]) => {
      let finalStat = stat.base

      finalStat += QualitiesArray
        .map(([qualityName, maxQuality], index) => {
          const previousMaxQuality = !index ? 0 : QualitiesArray[index - 1][1]
          if (artifact.quality < previousMaxQuality) { return null }

          const currentQuality = Math.min(artifact.quality - previousMaxQuality, maxQuality - previousMaxQuality)
          const statQuality = {
            ...stat.qualities.base,
            ...stat.qualities[qualityName]
          }

          let quality = (currentQuality * statQuality.bonus) + (statQuality.gapBonus || 0)
          if (artifact.quality < maxQuality) {
            quality += (statQuality.potentialBonus || 0) * artifact.potential
          }

          return quality
        })
        .filter((o) => o)
        .reduce((a, b) => a + b, 0)
      return [statName, finalStat]
    })
    .reduce((acc, [statName, stat]) => {
      acc[statName] = stat
      return acc
    }, {})

  return stats
}

class Artifact {
  constructor(values) {
    Object.assign(this, values)
    this.stats = calculateArtifactStats(this)
  }
}


const calculateContainerStats = (artifacts) => {

}

const artifacts = [
  new Artifact({
    type: ArtifactTypes.mamaBead,
    potential: 5,
    quality: 100,
  })
]

console.log(artifacts)

const artifactsStats = calculateContainerStats(artifacts)

console.log(artifactsStats)