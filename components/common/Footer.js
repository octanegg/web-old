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
    <FooterIcon icon="twitter" href="http://twitter.com/octane_gg" />
    <FooterIcon icon="discord" href="http://discord.gg/gxHfxWq" />
    <FooterIcon icon="twitch" href="https://www.twitch.tv/octanegg" />
    <FooterIcon icon="facebook" href="https://t.co/OVFoXPjaIO?amp=1" />
    <FooterIcon icon="youtube" href="https://www.youtube.com/channel/UC5zqB1onki6tt0gtExFP97A" />
  </Flex>
)

export default Footer
