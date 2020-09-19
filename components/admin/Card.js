import { Box, Heading, Select } from "@chakra-ui/core";

export const Card = ({ title, width, children }) => {
  return (
    <Box border="1px solid black" padding="1rem" width={width}>
      {title && (
        <Heading size="md" paddingBottom="0.5rem">
          {title}
        </Heading>
      )}
      {children}
    </Box>
  );
};

export const SelectionCard = ({
  title,
  onChange,
  data,
  display,
  placeholder,
}) => {
  return (
    <Card title={title} width={["100%", 1 / 2]}>
      <Select onChange={onChange} placeholder={placeholder}>
        {data.map((item, i) => (
          <option key={i} value={i}>
            {display(item)}
          </option>
        ))}
      </Select>
    </Card>
  );
};

export default Card;
