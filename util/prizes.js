export const currencies = [
  { id: 'USD', prefix: '$' },
  { id: 'EUR', suffix: '€' },
  { id: 'AUD', prefix: 'A$' },
  { id: 'CAD', prefix: 'C$' },
  { id: 'GBP', prefix: '£' },
  { id: 'CHF', suffix: 'fr.' },
  { id: 'NOK', suffix: 'kr' },
  { id: 'SEK', suffix: 'kr' },
  { id: 'PLN', suffix: 'zł' },
  { id: 'HUF', suffix: 'Ft' },
  { id: 'DKK', suffix: 'kr.' },
  { id: 'MXN', prefix: 'Mex$' },
]

export const rates = {
  CAD: 1.2652320884,
  HKD: 7.7527413637,
  ISK: 128.2875752329,
  PHP: 47.9314040729,
  DKK: 6.1312556682,
  HUF: 295.2840300107,
  CZK: 21.1740456757,
  GBP: 0.7191441999,
  RON: 4.0195399456,
  SEK: 8.2805672356,
  IDR: 13898.3510594443,
  INR: 72.6094484294,
  BRL: 5.3701047077,
  RUB: 73.3405886718,
  HRK: 6.2428889439,
  JPY: 105.3013438866,
  THB: 29.890345453,
  CHF: 0.8905927941,
  EUR: 0.8244702778,
  MYR: 4.0344628576,
  BGN: 1.6124989694,
  TRY: 6.9600131915,
  CNY: 6.4582405804,
  NOK: 8.406546294,
  NZD: 1.3838733614,
  ZAR: 14.4287245445,
  USD: 1.0,
  MXN: 19.937752494,
  SGD: 1.3229450078,
  AUD: 1.2863385275,
  ILS: 3.2442080963,
  KRW: 1102.4156979141,
  PLN: 3.6989034545,
}

export const prizeUSD = (prize) => {
  if (!prize) {
    return 0
  }

  const { amount, currency } = prize
  return currency === 'USD' ? amount : amount / rates[currency]
}
export const formatPrize = (prize) => {
  if (!prize) {
    return ''
  }

  const { amount, currency } = prize
  const _currency = currencies.find((c) => c.id === currency)
  return `${_currency?.prefix || ''}${parseFloat(amount.toFixed(0)).toLocaleString()}${
    _currency?.suffix || ''
  }`
}

export const formatPrizeUSD = (prize) => {
  if (!prize) {
    return ''
  }

  const { amount, currency } = prize
  return formatPrize({ amount: prizeUSD({ amount, currency }), currency: 'USD' })
}

export default formatPrize
