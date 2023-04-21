const { codify } = require('../../../../utils')

const hardCodedServices = {
  drug_farm_001_frost: {
    parentName: 'Jumptown',
  },
  /*
  Fence_Junkyard_Stanton1_1: {
    name: 'Shop, Reclamation & Disposal Orinth',
    parent: 'RECLAMATION-&-DISPOSAL-ORINTH',
  },
  /**/
  Fence_Junkyard_Stanton2b_1: {
    parentName: "Brio's Breaker Yard",
  },
  Fence_Junkyard_Stanton3b_1: {
    parentName: "Samson & Son's Salvage Center",
  },
  Fence_Junkyard_Stanton4c_1: {
    parentName: 'Devlin Scrap & Salvage',
  },
  Fence_RestStop2_4: {
    parentName: 'Reclamation & Disposal Orinth',
  },
  indy_farmer_001_sand: {
    parentName: 'Bountiful Harvest Hydroponics',
  },
  indy_farmer_001_dust: {
    parentName: 'Gallete Family Farms',
  },
  indy_miner_001_dust: {
    parentName: 'Tram & Myers Mining',
  },
  indy_miner_001_frost: {
    parentName: 'Benson Mining Outpost',
  },
  t_mills_cluster_001_dust: {
    parentName: 'Terra Mills HydroFarm',
  },
  stanton_4c_indyFarm_001: {
    parentName: "Bud's Growery",
  },
  stanton_3b_indyFarm_001: {
    parentName: 'Indy farmer, Shady Glen Farms',
  },
  shubin_cluster_001_sand: {
    parentName: 'Shubin Mining Facility SCD-1'
  },
  arccorp_cluster_001_sand: {
    parentName: 'ArcCorp Mining Area 141',
  },
  indy_miner_001_sand: {
    parentName: 'Kudre Ore',
  },
  arccorp_cluster_001_frost: {
    parentName: 'ArcCorp Mining Area 157',
  },
  stanton_1a_hrst_001: {
    parentName: 'HDMS-Bezdek'
  },
  stanton_1a_hrst_002: {
    parentName: 'HDMS-Lathan'
  },
  stanton_1b_hrst_001: {
    parentName: 'HDMS-Norgaard'
  },
  stanton_1b_hrst_002: {
    parentName: 'HDMS-Anderson'
  },
  stanton_1c_hrst_001: {
    parentName: 'HDMS-Hahn'
  },
  stanton_1c_hrst_002: {
    parentName: 'HMDS-Perlman'
  },
  stanton_1d_hrst_001: {
    parentName: 'HDMS-Woodruff'
  },
  stanton_1d_hrst_002: {
    parentName: 'HDMS-Ryder'
  },
  stanton_1_hrst_001: {
    parentName: 'HDMS-Edmond'
  },
  stanton_1_hrst_002: {
    parentName: 'HDMS-Oparei'
  },
  stanton_1_hrst_003: {
    parentName: 'HDMS-Pinewood'
  },
  stanton_1_hrst_004: {
    parentName: 'HDMS-Thedus'
  },
  stanton_1_hrst_005: {
    parentName: 'HDMS-Hadley'
  },
  stanton_1_hrst_006: {
    parentName: 'HDMS-Stanhope'
  },
  stanton_3a_indy_humboldt: {
    parentName: 'Humbolt Mines'
  },
  stanton_3a_indy_loveridge: {
    parentName: 'Loveridge Mineral Reserve'
  },
  stanton_3a_shubin_sal2: {
    parentName: 'Shubin Mining Facility SAL-2'
  },
  stanton_3a_shubin_sal5: {
    parentName: 'Shubin Mining Facility SAL-5'
  },
  stanton_3b_arccorp_area045: {
    parentName: 'ArcCorp mining Area 45'
  },
  stanton_3b_arccorp_area048: {
    parentName: 'ArcCorp mining Area 48'
  },
  stanton_3b_arccorp_area056: {
    parentName: 'ArcCorp mining Area 56',
  },
  stanton_3b_arccorp_area061: {
    parentName: 'ArcCorp mining Area 61',
  },
  stanton_4b_rayari_002: {
    parentName: 'Rayari McGrath Research Outpost',
  },
  stanton_4b_rayari_001: {
    parentName: 'Rayar,i Anvik Research Outpost',
  },
  stanton_4a_rayari_001: {
    parentName: 'Rayari Anvik Research Outpost',
  },
  stanton_4a_rayari_002: {
    parentName: 'Rayari Kaltag Research Outpost',
  },
  stanton_4_rayari_001: {
    parentName: 'Rayari Deltana Research Outpost'
  },
  rayari_cluster_001_dust: {
    parentName: 'Hickes Research Outpost'
  },
  rayari_cluster_001_frost: {
    parentName: 'Deakins Research Outpost',
  },
  StashHouse_Stanton2a_PrivateProperty: {
    name: 'Shop, Private Property',
    parent: {
      '@type': 'outpost',
      name: 'Private Property',
      parent: 'CELLIN',
    }
  },
  StashHouse_Stanton2b_NuenWaste: {
    parentName: 'Nuen Waste Management',
  },
  StashHouse_Stanton2c_NT999XX: {
    parentName: 'NT-999-XX',
  },
  DrugLab_Stanton3a_ParadiseCove: {
    parentName: 'Paradise Cove',
  },
  StashHouse_Stanton3a_Orphanage: {
    parentName: 'The Orphanage',
  },
  StashHouse_Stanton4: {
    name: 'Shop, Cellin Stash House',
    parent: {
      '@type': 'outpost',
      name: 'Cellin Stash House',
      parent: 'CELLIN',
    }
  },
  stanton_4a_drugfarm_001: {
    parentName: "Raven's Roost",
  },
  Technotic: {
    name: 'Technotic',
    parent: 'GRIM-HEX'
  },
  Fence_RestStop2_5: {
    name: 'Locker Room',
    parent: 'CRU-L5',
  }
}

module.exports = ({ services, locations }) => {
  return async (shopJson) => {
    const hardcodedShop = hardCodedServices[shopJson.Name]
    if (!hardcodedShop) { return false }

    if (hardcodedShop.parentName) {
      hardcodedShop.name = `Shop, ${hardcodedShop.parentName}`
      hardcodedShop.parent = codify(hardcodedShop.parentName)
      delete hardcodedShop.parentName
    }
    if (typeof hardcodedShop.parent === 'object') {
      const parent = await locations.save(hardcodedShop.parent, true)
      hardcodedShop.parent = parent._id
    }
    if (!hardcodedShop.name) {
      console.log(hardcodedShop)
      throw new Error()
    }
    const shop = await services.save({
      '@type': 'shop',
      ...hardcodedShop
    })

    await services.processInventary(shopJson, shop)
    return true
  }
}