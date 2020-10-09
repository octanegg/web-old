import styles from "./Footer.module.scss";

import { Flex, Image } from "@chakra-ui/core";
import Link from "next/link";

const FooterIcon = ({ icon, href }) => (
  <a href={href} target="_blank">
    <Image className={styles.footerIcon} src={`/images/${icon}.svg`} />
  </a>
);

const Footer = (props) => {
  return (
    <Flex
      borderTop="1px solid #ccc"
      width="100%"
      mt="auto"
      justify="center"
      padding=".5rem 0"
      backgroundColor="#1a2f42"
    >
      <FooterIcon icon="twitter" href="http://twitter.com/octane_gg" />
      <FooterIcon icon="discord" href="http://discord.gg/gxHfxWq" />
      <FooterIcon icon="twitch" href="https://www.twitch.tv/octanegg" />
      <FooterIcon icon="facebook" href="https://t.co/OVFoXPjaIO?amp=1" />
      <FooterIcon
        icon="youtube"
        href="https://www.youtube.com/channel/UC5zqB1onki6tt0gtExFP97A"
      />
    </Flex>
  );
};

export default Footer;
