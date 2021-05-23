import { Text, Stack } from '@chakra-ui/react'
import Image from '@octane/components/common/Image'
import { getCountry } from '@octane/config/fields/countries'

export const Flag = ({ country, justify, isLabeled }) => {
  const data = getCountry(country || 'int')

  return (
    <Stack justify={justify || 'center'} direction="row">
      <Image boxSize={5} src={data?.image} />
      {isLabeled && <Text>{data?.label}</Text>}
    </Stack>
  )
}

export default Flag
