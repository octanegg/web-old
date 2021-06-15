import { Flex, Image } from '@chakra-ui/react'

const FooterIcon = ({ icon, href }) => (
  <a href={href} target="_blank" rel="noreferrer">
    <Image width={6} marginLeft={3} marginRight={3} cursor="pointer" src={`/images/${icon}.svg`} />
  </a>
)

const Footer = () => (
  <Flex
    borderTop="main"
    width="full"
    justify="center"
    paddingTop={2}
    paddingBottom={2}
    backgroundColor="secondary.800">
    <FooterIcon icon="twitter" href="https://twitter.com/octane_gg" />
    <FooterIcon icon="discord" href="https://discord.gg/gxHfxWq" />
    <FooterIcon icon="patreon" href="https://www.patreon.com/octanegg" />
  </Flex>
)

export default Footer
