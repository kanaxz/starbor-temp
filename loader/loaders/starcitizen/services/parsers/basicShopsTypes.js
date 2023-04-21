const basicShopTypes = {
  'Aparelli': 'Aparelli',
  'CasabaOutlet': 'Casaba Outlet',
  'Centermass': 'Centermass',
  'DumpersDepot_Commodities': 'Dumpers Depot',
  'Generic_FPSArmor': 'FPS Armour',
  'GiftShop:': 'Gift Shop',
  'LivefireWeapons': 'Live Fire Weapons',
  'MiningKiosks_RS': 'Mining Kiosks',
  'MiningKiosks': 'Mining Kiosks',
  'PlatinumBay': 'Platinum Bay',
  'CargoOffice': 'Cargo Office',
  'AstroArmada': 'Astro Armada',
  'CubbyBlast': 'Cubby Blast',
  'FactoryLine': 'Factory Line',
  'Makau': 'Makau',
  'TammanyAndSons': 'Tammany And Sons',
  'KCTrending': 'KC Trending',
  'ShipWeapons_Generic': 'Ship Weapons',
  'OmegaPro': 'Omega Pro',
  'NewDeal': 'New Deal',
  'HDShowcase': 'Hurston Dynamics Showcase',
  'RS_RefineryStore': 'Refinery Store',
  'Pharmacy_RestStop': 'Pharmacy',
  'ShubinInterstellar': 'Shubin Interstellar',
  'Skutters': 'Skutters',
  'CubbyBlast': 'Cubby Blast',
  'GarrityDefense': 'GarrityDefense',
  'TravelerRentals': 'Traveler Rentals',
  'VantageRentals': 'Vantage Rentals',
  'RegalLuxury': 'Regal Luxury',
  'FactoryLine': 'Factory Line',
  'Transfers': 'Transfers',
  'TDD': 'Trade & Development Division',
  'RaceBar': 'Race Bar',
  'CrusaderShowroomWeaponry': 'Crusader Showroom'
}

module.exports = ({ db, services }, utils) => {

  return async (shopJson) => {
    const shopTypeName = Object.keys(basicShopTypes)
      .find((s) => shopJson.Name.startsWith(`${s}_`))
    if (!shopTypeName) { return false }
    const shopTypeDisplayName = basicShopTypes[shopTypeName]
    const shopName = shopJson.Name.replace(`${shopTypeName}_`, '')
    const location = await utils.findLocation(shopName)
    if (!location) {
      //console.log(shopJson)
      console.log(`Location not found for ${shopJson.Name}`)
      return false
    }

    const name = `${shopTypeDisplayName}, ${location.name}`
    const shop = await services.save({
      type: '@shop',
      shopType: shopTypeName,
      parent: location._id,
      name
    })
    await services.processInventary(shopJson, shop)
    return true
  }
}