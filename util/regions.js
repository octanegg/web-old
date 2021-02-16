export const regions = [
  {
    id: 'NA',
    image: 'https://griffon.octane.gg/regions/na.png',
    label: 'North America',
  },
  {
    id: 'EU',
    image: 'https://griffon.octane.gg/regions/eu.png',
    label: 'Europe',
  },
  {
    id: 'OCE',
    image: 'https://griffon.octane.gg/regions/au.png',
    label: 'Oceania',
  },
  {
    id: 'SAM',
    image: 'https://griffon.octane.gg/regions/sam.png',
    label: 'South America',
  },
  {
    id: 'ASIA',
    image: 'https://griffon.octane.gg/regions/int.png',
    label: 'Asia',
  },
  {
    id: 'ME',
    image: 'https://griffon.octane.gg/regions/int.png',
    label: 'Middle East',
  },
  {
    id: 'INT',
    image: 'https://griffon.octane.gg/regions/int.png',
    label: 'International',
  },
]

export const getRegion = (regionId) => regions.find((region) => regionId === region.id)

export const getRegions = () => regions
