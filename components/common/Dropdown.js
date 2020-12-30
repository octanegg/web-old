import {
  Button,
  List,
  ListItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/core'
import { ChevronDownIcon } from '@chakra-ui/icons'

const Dropdown = ({ items, label, itemToString, onChange }) => {
  return (
    <Popover placement="bottom" closeOnBlur={true}>
      <PopoverTrigger>
        <Button
          borderRadius={64}
          size="sm"
          fontWeight="semi"
          fontSize="xs"
          _focus={{ outline: 'none' }}>
          {label}
          <ChevronDownIcon marginLeft={1} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        color="secondary.800"
        fontSize="sm"
        border=""
        _focus={{ outline: 'none' }}
        bg="white"
        shadow="0px 1px 2px rgba(128, 138, 157, 0.12), 0px 8px 32px rgba(128, 138, 157, 0.24)">
        <PopoverArrow />
        <PopoverBody>
          <List>
            {items.map((item, i) => (
              <ListItem
                padding={2}
                _hover={{ backgroundColor: 'secondary.50' }}
                borderRadius={8}
                fontSize="sm"
                fontWeight="semi"
                cursor="pointer"
                value={item}
                onClick={(e) => onChange(e.currentTarget.getAttribute('value'))}>
                {itemToString ? itemToString(item) : item}
              </ListItem>
            ))}
          </List>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default Dropdown
