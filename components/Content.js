const { Box, Center } = require("@chakra-ui/core");

const Content = ({ children }) => {
  return (
    <Center>
      <Box margin="2rem" width="80%">
        {children}
      </Box>
    </Center>
  );
};

export default Content;
