import { Text, Image, Stack } from '@chakra-ui/core'
import { getCountry } from '@octane/util/countries'
import { getRegion } from '@octane/util/regions'

export const Flag = ({ country, region, justify, isLabeled }) => {
  const data = country ? getCountry(country || 'int') : region && getRegion(region || 'int')
  const image = country
    ? `${process.env.ASSETS_URL}${data?.image}`
    : `https://octane.gg${data?.image}`

  return isLabeled ? (
    <Stack justify={justify || 'center'} direction="row">
      <Image width={5} src={image} />
      <Text marginLeft={1}>{data?.name}</Text>
    </Stack>
  ) : (
    <Image width={5} src={image} />
  )
}
