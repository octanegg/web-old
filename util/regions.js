export const regions = [
  {
    id: 'All',
    image: '/flags/int.png',
    name: 'All Regions',
  },
  {
    id: 'NA',
    image: '/flags/na.png',
    name: 'North America',
  },
  {
    id: 'EU',
    image: '/flags/eu.png',
    name: 'Europe',
  },
  {
    id: 'OCE',
    image: '/flags/au.png',
    name: 'Oceania',
  },
  {
    id: 'SAM',
    image: '/flags/sam.png',
    name: 'South America',
  },
  {
    id: 'ASIA',
    image: '/flags/int.png',
    name: 'Asia',
  },
  {
    id: 'INT',
    image: '/flags/int.png',
    name: 'International',
  },
]

export const getRegion = (regionId) => regions.find((region) => regionId == region.id)

export const getRegions = () => regions
