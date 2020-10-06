const { Box, Center } = require("@chakra-ui/core");

const Content = ({ children }) => {
  return (
    <Center>
      <Box marginTop="2rem" width={{base: "100%", md: "80%"}}>
        {children}
      </Box>
    </Center>
  );
};

export default Content;
