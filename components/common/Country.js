import { Flex, Tooltip } from '@chakra-ui/react'
import Image from '@octane/components/common/Image'
import { getCountry } from '@octane/config/fields/countries'

export const Country = ({ country, boxSize }) => {
  const { label, image } = getCountry(country)

  return (
    <Tooltip hasArrow placement="top" label={label}>
      <Flex zIndex={2}>
        <Image boxSize={boxSize || 5} src={image} />
      </Flex>
    </Tooltip>
  )
}

export default Country
