import { Flex, Image as ChakraImage } from '@chakra-ui/react'

export const Image = ({ src, boxSize, width, height, marginLeft, marginRight }) => {
  if (!src) {
    return (
      <Flex
        width={boxSize || width}
        marginLeft={marginLeft}
        marginRight={marginRight}
        justify="center">
        <ChakraImage
          src="/images/logo.svg"
          height={boxSize || height}
          filter="grayscale(100%)"
          opacity={0.4}
        />
      </Flex>
    )
  }

  return (
    <ChakraImage
      height={boxSize || height}
      width={boxSize || width}
      marginLeft={marginLeft}
      marginRight={marginRight}
      src={src}
    />
  )
}

export default Image
