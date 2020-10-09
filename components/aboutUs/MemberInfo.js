import { Flex, Image, Text, Divider } from "@chakra-ui/core";

const MemberInfo = (props) => {
    const { photo, twitter, name, role, children } = props;

    return <Flex width={{ base: "100%", md: "45%" }} flexDirection="column" align="center" margin="1rem" border="1px solid #ddd" padding="1rem" shadow="0 1px 3px -1px rgba(0, 0, 0, 0.4)" backgroundColor="white">
        <Flex flexDirection={{ base: "column", md: "row" }} align="center" padding="1rem 2rem" >
            <Image border="5px solid #2fca7e" mb={{ base: "0.5rem", md: 0 }} src={photo} rounded="full" width={{ base: "50%", md: "25%" }} mr={{ base: 0, md: "2rem" }} />
            <Flex flexDirection="column">
                <Text fontSize={{ base: "1.3rem", md: "1.6rem" }} fontWeight="500" color="#1a2f42">{name}</Text>
                <Text fontSize={{ base: "0.8rem", md: "0.95rem" }} fontStyle="italic">{role}</Text>
                <Flex align="center" fontWeight="medium" textDecor="underline" fontSize={{ base: "0.8rem", md: "0.95rem" }}>
                    <Image src="/images/twitter-dark.svg" width={{ base: "18px", md: "24px" }} mr=".5rem" />
                    <a href={`https://twitter.com/${twitter}`}><Text>@{twitter}</Text></a>
                </Flex>
            </Flex>
        </Flex>
        <Divider />
        <Flex fontSize={{ base: "0.8rem", md: "1rem" }} width={{ base: "95%", md: "80%" }} padding=".5rem" margin="0 auto">{children}</Flex>
    </Flex>;
}

export default MemberInfo;