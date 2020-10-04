import { Box, Heading, Select, Input, List, ListItem } from "@chakra-ui/core";
import Downshift from "downshift";
import { useState } from "react";

export const Card = ({ title, width, children }) => {
  return (
    <Box
      border="1px solid black"
      padding="1rem"
      width={width}
      backgroundColor="#fff"
    >
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
  value,
}) => {
  return (
    <Card title={title} width={["100%", 1 / 2]}>
      <Select onChange={onChange} placeholder={placeholder} value={value}>
        {data.map((item, i) => (
          <option key={i} value={i}>
            {display(item)}
          </option>
        ))}
      </Select>
    </Card>
  );
};

export const DropdownCard = ({ title, items, itemToString, onChange }) => {
  const [lastSelected, setLastSelected] = useState();

  return (
    <Card title={title} width={["100%", 1 / 2]}>
      <Downshift
        id={title}
        onChange={(selected) => {
          if (selected) {
            setLastSelected(selected);
            onChange(selected);
          }
        }}
        itemToString={itemToString}
      >
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          getRootProps,
          inputValue,
          isOpen,
          clearSelection,
          selectItem,
        }) => (
          <Box {...getRootProps()}>
            <Input
              {...getInputProps()}
              placeholder="Select..."
              onFocus={() => {
                clearSelection();
              }}
              onBlur={() => selectItem(lastSelected)}
            />
            {isOpen && (
              <List
                {...getMenuProps()}
                maxHeight={400}
                overflowY="scroll"
                position="absolute"
                backgroundColor="white"
                width="25%"
                zIndex={100}
                border="1px solid black"
                cursor="pointer"
              >
                {items
                  .filter(
                    (item) =>
                      !inputValue ||
                      itemToString(item)
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                  )
                  .map((item, index) => (
                    <ListItem
                      {...getItemProps({
                        key: index,
                        item,
                        index,
                      })}
                      padding={2}
                      borderBottom="1px solid black"
                      _hover={{ backgroundColor: "#eee" }}
                    >
                      {itemToString(item)}
                    </ListItem>
                  ))}
              </List>
            )}
          </Box>
        )}
      </Downshift>
    </Card>
  );
};

export default Card;
