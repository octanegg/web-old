import { Text, Image, Stack } from '@chakra-ui/react'
import { getCountry } from '@octane/config/fields/countries'

export const Flag = ({ country, justify, isLabeled }) => {
  const data = getCountry(country || 'int')

  return (
    <Stack justify={justify || 'center'} direction="row">
      <Image width={5} src={data?.image} />
      {isLabeled && <Text>{data?.label}</Text>}
    </Stack>
  )
}

export default Flag
