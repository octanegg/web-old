import {
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spacer,
  Stack,
  StackDivider,
  Text,
  Button as ChakraButton,
  ListItem,
  List,
} from '@chakra-ui/core'
import { Button, ButtonTypes } from '@octane/components/common/Button'
import { useState } from 'react'

const MAX_STATS = 6

const MoreStats = ({ stats, onChange, isOpen, open, close }) => (
  <Popover placement="bottom" isOpen={isOpen} onClose={close}>
    <PopoverTrigger>
      <ChakraButton
        color="secondary.800"
        backgroundColor="secondary.50"
        fontWeight="semi"
        size="xs"
        borderLeftRadius={0}
        borderRightRadius={8}
        _hover={{ color: 'secondary.800' }}
        _focus={{ outline: 'none' }}
        onClick={open}>
        More...
      </ChakraButton>
    </PopoverTrigger>
    <PopoverContent
      color="secondary.800"
      fontSize="sm"
      border=""
      _focus={{ outline: 'none' }}
      bg="white"
      shadow="0px 1px 2px rgba(128, 138, 157, 0.12), 0px 8px 32px rgba(128, 138, 157, 0.24)">
      <PopoverBody padding={0}>
        <List maxHeight={400} overflowY="scroll">
          {stats.map(({ id, label }, i) => (
            <ListItem
              key={i}
              padding={2}
              borderTopRadius={i === 0 ? 6 : 0}
              borderBottomRadius={i === stats.length - 1 ? 6 : 0}
              _hover={{ backgroundColor: 'secondary.50' }}
              fontSize="13px"
              fontWeight="semi"
              cursor="pointer"
              value={id}
              onClick={(e) => {
                onChange(stats.find((stat) => e.currentTarget.getAttribute('value') === stat.id))
                close()
              }}>
              {label}
            </ListItem>
          ))}
        </List>
      </PopoverBody>
    </PopoverContent>
  </Popover>
)

export const StatsNavigation = ({
  stats,
  selectedStats,
  onStatsChange,
  selectedCluster,
  onClusterChange,
  right,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const mainStats = stats.slice(0, MAX_STATS)
  const moreStats = stats.slice(MAX_STATS)

  return (
    <Flex paddingLeft={2} paddingRight={2} align="center" width="full">
      <Stack direction="row" spacing={0} divider={<StackDivider borderColor="secondary.200" />}>
        {mainStats.map((statGroup, i) => {
          const { id, label } = statGroup
          const buttonType =
            id === selectedStats.id ? ButtonTypes.stat.selected : ButtonTypes.stat.default
          const override = {
            borderLeftRadius: i === 0 ? 8 : 0,
            borderRightRadius: i === stats.length - 1 ? 8 : 0,
          }
          return (
            <Button
              key={i}
              buttonType={buttonType}
              override={override}
              onClick={() => onStatsChange(statGroup)}>
              <Stack direction="row" spacing={1} align="center">
                {/* <Icon as={icon} boxSize={3} /> */}
                <Text>{label}</Text>
              </Stack>
            </Button>
          )
        })}
        {!mainStats.includes(selectedStats) && (
          <Button
            buttonType={ButtonTypes.stat.selected}
            onClick={() => onStatsChange(selectedStats)}>
            <Stack direction="row" spacing={1} align="center">
              {/* <Icon as={selected.icon} boxSize={3} /> */}
              <Text>{selectedStats.label}</Text>
            </Stack>
          </Button>
        )}
        {stats.length > 5 && (
          <MoreStats
            stats={moreStats}
            isOpen={isOpen}
            open={() => setIsOpen(!isOpen)}
            close={() => setIsOpen(false)}
            onChange={(statGroup) => onStatsChange(statGroup)}
          />
        )}
      </Stack>
      <Spacer />
      {right}
      {onClusterChange && (
        <Stack direction="row" spacing={0} divider={<StackDivider borderColor="secondary.200" />}>
          <Button
            buttonType={!selectedCluster ? ButtonTypes.stat.selected : ButtonTypes.stat.default}
            override={{ borderLeftRadius: 8 }}
            onClick={() => onClusterChange('')}>
            <Stack direction="row" spacing={1} align="center">
              <Text>Total</Text>
            </Stack>
          </Button>
          <Button
            buttonType={
              selectedCluster === 'game' ? ButtonTypes.stat.selected : ButtonTypes.stat.default
            }
            onClick={() => onClusterChange('game')}>
            <Stack direction="row" spacing={1} align="center">
              <Text>Game</Text>
            </Stack>
          </Button>
          <Button
            buttonType={
              selectedCluster === 'series' ? ButtonTypes.stat.selected : ButtonTypes.stat.default
            }
            override={{ borderRightRadius: 8 }}
            onClick={() => onClusterChange('series')}>
            <Stack direction="row" spacing={1} align="center">
              <Text>Series</Text>
            </Stack>
          </Button>
        </Stack>
      )}
    </Flex>
  )
}

export default StatsNavigation
