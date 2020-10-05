import React from "react";
import { Flex, Box, Text, Link } from "@chakra-ui/core";

const TitleToLink = (title) => `/news/${title.toLowerCase().replace(/ /g, "-")}`;

const RecentArticles = (props) => {
    const { articles } = props;

    return <Flex width={{ base: "100%", md: "50%" }} height={{ base: "auto", md: "50vh" }} wrap="wrap">
        {articles?.map((article, index) => {
            const { title, description } = article;
            const isFirst = index === 0;

            return <Box key={index} width={isFirst ? "100%" : "50%"} minHeight={isFirst ? "66%" : "33%"} border="1px solid #ccc" boxSizing="border-box"
                background={`linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${article.image})`} backgroundPosition="center" backgroundSize="cover">
                <Flex padding={isFirst ? "1rem" : "0.5rem"} flexDirection="column" justify="flex-end" height="100%" width="100%" boxSizing="">
                    <Text fontSize={isFirst ? "3rem" : "1.5rem"} lineHeight={isFirst ? "3rem" : "1.5rem"} fontWeight="bold" textTransform="uppercase" color="#49fca4">{title}</Text>
                    <Text fontSize={isFirst ? "1.5rem" : "1rem"} textOverflow="ellipsis" color="white" isTruncated>{description}</Text>
                    <Link href={TitleToLink(title)} color="white" textDecoration="underline">Read more..</Link>
                </Flex>
            </Box>
        })}
    </Flex>;
};

export default RecentArticles;