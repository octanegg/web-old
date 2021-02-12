export const regions = [
  {
    id: 'NA',
    image: 'https://griffon.octane.gg/regions/na.png',
    name: 'North America',
  },
  {
    id: 'EU',
    image: 'https://griffon.octane.gg/regions/eu.png',
    name: 'Europe',
  },
  {
    id: 'OCE',
    image: 'https://griffon.octane.gg/regions/au.png',
    name: 'Oceania',
  },
  {
    id: 'SAM',
    image: 'https://griffon.octane.gg/regions/sam.png',
    name: 'South America',
  },
  {
    id: 'ASIA',
    image: 'https://griffon.octane.gg/regions/int.png',
    name: 'Asia',
  },
  {
    id: 'INT',
    image: 'https://griffon.octane.gg/regions/int.png',
    name: 'International',
  },
]

export const getRegion = (regionId) => regions.find((region) => regionId === region.id)

export const getRegions = () => regions
