const currencies = [
  { id: 'MXN', prefix: 'Mex$' },
  { id: 'NOK', suffix: 'kr' },
  { id: 'CHF', suffix: 'fr.' },
  { id: 'AUD', prefix: 'A$' },
  { id: 'SEK', suffix: 'kr' },
  { id: 'GBP', prefix: '£' },
  { id: 'PLN', suffix: 'zł' },
  { id: 'EUR', suffix: '€' },
  { id: 'HUF', suffix: 'Ft' },
  { id: 'CAD', prefix: 'C$' },
  { id: 'USD', prefix: '$' },
  { id: 'DKK', suffix: 'kr.' },
]

export const formatPrize = ({ amount, currency }) => {
  const _currency = currencies.find((c) => c.id === currency)
  return `${_currency?.prefix || ''} ${amount.toFixed(0)} ${_currency?.suffix || ''}`
}

export default formatPrize
