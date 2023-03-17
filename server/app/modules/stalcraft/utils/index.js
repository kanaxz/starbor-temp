
const weaponTypes = {

}

const MAX_SCALING = 50

const weapons = {
  aek971: {
    damage: 36,
    fireRate: 850,
  },
  pkp: {
    damage: 43,
    fireRate: 625,
    scalingDamage: 2,
  },
  rpd: {
    damage: 42,
    fireRate: 650,
    scalingDamage: 1.5,
  },
  fn2000: {
    damage: 34,
    fireRate: 850,
  },
  g36: {
    damage: 37,
    fireRate: 750,
  }
}


const calculateWeaponStats = (weapon) => {
  const fireRatePerSecond = weapon.fireRate / 60
  const bulletFireRate = 60 / weapon.fireRate
  const result = {
    fireRatePerSecond,
    damagePerSecond: weapon.damage * fireRatePerSecond,
  }

  if (weapon.scalingDamage) {
    const scalingBullets = MAX_SCALING / weapon.scalingDamage
    Object.assign(result, {
      scalingDamagePerSecond: weapon.damage * (1 + (MAX_SCALING / 100)) * fireRatePerSecond,
      scalingBullets,
      scalingTimeInSeconds: bulletFireRate * scalingBullets,
    })
  }
  return result
}

const weaponsDps = Object.entries(weapons)
  .map(([name, weapon]) => ({ name, dps: calculateWeaponStats(weapon) }))
  .reduce((acc, stats) => {
    acc[stats.name] = stats.dps
    return acc
  }, {})



console.log(weaponsDps)
