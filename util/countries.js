export const countries = [
  { id: 'ar', label: 'Argentina', image: `https://griffon.octane.gg/flags/198-argentina.svg` },
  { id: 'at', label: 'Austria', image: `https://griffon.octane.gg/flags/003-austria.svg` },
  { id: 'au', label: 'Australia', image: `https://griffon.octane.gg/flags/234-australia.svg` },
  { id: 'bd', label: 'Bangladesh', image: `https://griffon.octane.gg/flags/147-bangladesh.svg` },
  { id: 'be', label: 'Belgium', image: `https://griffon.octane.gg/flags/165-belgium.svg` },
  { id: 'br', label: 'Brazil', image: `https://griffon.octane.gg/flags/255-brazil.svg` },
  { id: 'ca', label: 'Canada', image: `https://griffon.octane.gg/flags/243-canada.svg` },
  { id: 'cl', label: 'Chile', image: `https://griffon.octane.gg/flags/131-chile.svg` },
  { id: 'cn', label: 'China', image: `https://griffon.octane.gg/flags/034-china.svg` },
  {
    id: 'cz',
    label: 'Czech Republic',
    image: `https://griffon.octane.gg/flags/149-czech-republic.svg`,
  },
  { id: 'dk', label: 'Denmark', image: `https://griffon.octane.gg/flags/174-denmark.svg` },
  { id: 'fi', label: 'Finland', image: `https://griffon.octane.gg/flags/125-finland.svg` },
  { id: 'fr', label: 'France', image: `https://griffon.octane.gg/flags/195-france.svg` },
  { id: 'de', label: 'Germany', image: `https://griffon.octane.gg/flags/162-germany.svg` },
  { id: 'en', label: 'England', image: `https://griffon.octane.gg/flags/216-england.svg` },
  { id: 'ab', label: 'Scotland', image: `https://griffon.octane.gg/flags/055-scotland.svg` },
  { id: 'wl', label: 'Wales', image: `https://griffon.octane.gg/flags/014-wales.svg` },
  { id: 'gr', label: 'Greece', image: `https://griffon.octane.gg/flags/170-greece.svg` },
  { id: 'hk', label: 'Hong Kong', image: `https://griffon.octane.gg/flags/183-hong-kong.svg` },
  { id: 'hu', label: 'Hungary', image: `https://griffon.octane.gg/flags/115-hungary.svg` },
  { id: 'id', label: 'Indonesia', image: `https://griffon.octane.gg/flags/209-indonesia.svg` },
  { id: 'ie', label: 'Ireland', image: `https://griffon.octane.gg/flags/179-ireland.svg` },
  { id: 'in', label: 'India', image: `https://griffon.octane.gg/flags/246-india.svg` },
  { id: 'it', label: 'Italy', image: `https://griffon.octane.gg/flags/013-italy.svg` },
  { id: 'jp', label: 'Japan', image: `https://griffon.octane.gg/flags/063-japan.svg` },
  { id: 'ma', label: 'Morocco', image: `https://griffon.octane.gg/flags/166-morocco.svg` },
  { id: 'mx', label: 'Mexico', image: `https://griffon.octane.gg/flags/252-mexico.svg` },
  { id: 'my', label: 'Malaysia', image: `https://griffon.octane.gg/flags/118-malaysia.svg` },
  { id: 'nl', label: 'Netherlands', image: `https://griffon.octane.gg/flags/237-netherlands.svg` },
  { id: 'no', label: 'Norway', image: `https://griffon.octane.gg/flags/143-norway.svg` },
  { id: 'nz', label: 'New Zealand', image: `https://griffon.octane.gg/flags/121-new-zealand.svg` },
  { id: 'pe', label: 'Peru', image: `https://griffon.octane.gg/flags/188-peru.svg` },
  { id: 'ph', label: 'Philippines', image: `https://griffon.octane.gg/flags/192-philippines.svg` },
  { id: 'pl', label: 'Poland', image: `https://griffon.octane.gg/flags/211-poland.svg` },
  { id: 'pr', label: 'Puerto Rico', image: `https://griffon.octane.gg/flags/028-puerto-rico.svg` },
  { id: 'pt', label: 'Portugal', image: `https://griffon.octane.gg/flags/224-portugal.svg` },
  { id: 'ru', label: 'Russia', image: `https://griffon.octane.gg/flags/248-russia.svg` },
  {
    id: 'sa',
    label: 'Saudia Arabia',
    image: `https://griffon.octane.gg/flags/133-saudi-arabia.svg`,
  },
  { id: 'se', label: 'Sweden', image: `https://griffon.octane.gg/flags/184-sweden.svg` },
  { id: 'ch', label: 'Switzerland', image: `https://griffon.octane.gg/flags/205-switzerland.svg` },
  { id: 'sg', label: 'Singapore', image: `https://griffon.octane.gg/flags/230-singapore.svg` },
  { id: 'sk', label: 'Slovakia', image: `https://griffon.octane.gg/flags/091-slovakia.svg` },
  { id: 'es', label: 'Spain', image: `https://griffon.octane.gg/flags/128-spain.svg` },
  { id: 'tr', label: 'Turkey', image: `https://griffon.octane.gg/flags/218-turkey.svg` },
  {
    id: 'us',
    label: 'United States',
    image: `https://griffon.octane.gg/flags/226-united-states.svg`,
  },
]

export const getCountry = (countryId) => countries.find((country) => countryId === country.id)

export const getCountries = () => countries
