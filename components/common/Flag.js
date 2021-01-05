import { Flex, Text, Image, Stack } from '@chakra-ui/core'
import { getCountry } from '../../util/countries'

export const Flag = ({ country, justify, isLabeled }) => {
  const _country = getCountry(country || 'int')
  return (
    <Stack justify={justify || 'center'} direction="row">
      <Image width={5} src={`${process.env.ASSETS_URL}${_country?.image}`} />
      {isLabeled && <Text marginLeft={1}>{_country?.name}</Text>}
    </Stack>
  )
}
