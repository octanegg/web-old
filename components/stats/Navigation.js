import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  Button as ChakraButton,
  ListItem,
  List,
  Icon,
} from '@chakra-ui/react'
import { Button, ButtonTypes } from '@octane/components/common/Button'
import { Heading } from '@octane/components/common/Text'
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
        borderLeftRadius={{ base: 8, lg: 0 }}
        borderRightRadius={8}
        _hover={{ color: 'primary.600', backgroundColor: 'primary.50' }}
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
  groups,
  group,
  onGroupChange,
  period,
  onPeriodChange,
  right,
  hideMobileLabels,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const mainStats = groups.slice(0, MAX_STATS)
  const moreStats = groups.slice(MAX_STATS)

  const _group = groups.find((g) => g.id === group)

  return (
    <Stack
      paddingLeft={2}
      paddingRight={2}
      spacing={{ base: 2, lg: 0 }}
      align="center"
      width="full"
      direction={{ base: right ? 'column-reverse' : 'column', lg: 'row' }}
      justify="space-between">
      <Stack
        direction="row"
        width={{ base: 'full', lg: 'auto' }}
        spacing={{ base: 2, lg: 0 }}
        paddingBottom={{ base: 2, lg: 0 }}
        justify={{ base: hideMobileLabels ? 'center' : 'flex-start' }}
        wrap="wrap"
        align="center"
        shouldWrapChildren>
        {!hideMobileLabels && <Heading display={{ base: 'flex', lg: 'none' }}>Stats:</Heading>}
        {mainStats.map((statGroup, i) => {
          const { id, label, icon } = statGroup
          const buttonType = id === group ? ButtonTypes.stat.selected : ButtonTypes.stat.default
          return (
            <Button
              key={i}
              buttonType={buttonType}
              override={{
                borderLeftRadius: { base: 8, lg: i === 0 ? 8 : 0 },
                borderRightRadius: { base: 8, lg: i === groups.length - 1 ? 8 : 0 },
                marginTop: { base: 1, lg: 0 },
                marginBottom: { base: 1, lg: 0 },
              }}
              onClick={() => onGroupChange(statGroup)}>
              <Stack direction="row" spacing={1} align="center">
                <Icon as={icon} boxSize={3} />
                <Text>{label}</Text>
              </Stack>
            </Button>
          )
        })}
        {!mainStats.includes(_group) && (
          <Button buttonType={ButtonTypes.stat.selected} onClick={() => onGroupChange(_group)}>
            <Stack direction="row" spacing={1} align="center">
              <Icon as={_group.icon} boxSize={3} />
              <Text>{_group.label}</Text>
            </Stack>
          </Button>
        )}
        {groups.length > 5 && (
          <MoreStats
            stats={moreStats}
            isOpen={isOpen}
            open={() => setIsOpen(!isOpen)}
            close={() => setIsOpen(false)}
            onChange={(statGroup) => onGroupChange(statGroup)}
          />
        )}
      </Stack>
      {right}
      {onPeriodChange && (
        <Stack
          direction="row"
          width={{ base: 'full', lg: 'auto' }}
          spacing={{ base: 2, lg: 0 }}
          wrap="wrap"
          align="center"
          shouldWrapChildren>
          {!hideMobileLabels && <Heading display={{ base: 'flex', lg: 'none' }}>Period:</Heading>}
          <Button
            buttonType={period === 'total' ? ButtonTypes.stat.selected : ButtonTypes.stat.default}
            override={{ borderLeftRadius: 8, borderRightRadius: { base: 8, lg: 0 } }}
            onClick={() => onPeriodChange('total')}>
            <Stack direction="row" spacing={1} align="center">
              <Text>Total</Text>
            </Stack>
          </Button>
          <Button
            buttonType={period === '5min' ? ButtonTypes.stat.selected : ButtonTypes.stat.default}
            override={{
              borderLeftRadius: { base: 8, lg: 0 },
              borderRightRadius: { base: 8, lg: 0 },
            }}
            onClick={() => onPeriodChange('5min')}>
            <Stack direction="row" spacing={1} align="center">
              <Text>5-Min</Text>
            </Stack>
          </Button>
          <Button
            buttonType={!period ? ButtonTypes.stat.selected : ButtonTypes.stat.default}
            override={{
              borderLeftRadius: { base: 8, lg: 0 },
              borderRightRadius: { base: 8, lg: 0 },
            }}
            onClick={() => onPeriodChange('')}>
            <Stack direction="row" spacing={1} align="center">
              <Text>Game</Text>
            </Stack>
          </Button>
          <Button
            buttonType={period === 'series' ? ButtonTypes.stat.selected : ButtonTypes.stat.default}
            override={{ borderLeftRadius: { base: 8, lg: 0 }, borderRightRadius: 8 }}
            onClick={() => onPeriodChange('series')}>
            <Stack direction="row" spacing={1} align="center">
              <Text>Series</Text>
            </Stack>
          </Button>
        </Stack>
      )}
    </Stack>
  )
}

export default StatsNavigation
