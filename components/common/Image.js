import { Flex, Image as ChakraImage } from '@chakra-ui/react'

export const Image = ({
  src,
  boxSize,
  defaultImage,
  width,
  height,
  marginLeft,
  marginRight,
  paddingLeft,
  paddingRight,
}) => {
  if (!src) {
    return (
      <Flex
        width={boxSize || width}
        marginLeft={marginLeft}
        marginRight={marginRight}
        justify="center">
        <ChakraImage
          src={defaultImage || '/images/logo.svg'}
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
      paddingLeft={paddingLeft}
      paddingRight={paddingRight}
      src={src}
    />
  )
}

export default Image
