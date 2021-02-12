import { Text, Image, Stack } from '@chakra-ui/core'
import { getCountry } from '@octane/util/countries'

export const Flag = ({ country, justify, isLabeled }) => {
  const data = getCountry(country || 'int')
  const image = `${process.env.ASSETS_URL}${data?.image}`

  return (
    <Stack justify={justify || 'center'} direction="row">
      <Image width={5} src={image} />
      {isLabeled && <Text>{data?.name}</Text>}
    </Stack>
  )
}

export default Flag
