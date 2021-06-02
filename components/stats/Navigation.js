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
        color="secondary.500"
        bgGradient="linear(to-bl, primary.50, secondary.100)"
        backgroundColor="secondary.50"
        fontWeight="semi"
        size="xs"
        borderLeftRadius={8}
        borderRightRadius={8}
        _hover={{
          color: 'secondary.700',
          backgroundColor: 'primary.50',
          bgGradient: 'linear(to-tr, primary.50, secondary.100)',
        }}
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
          {stats.map(({ id, icon, label }, i) => (
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
              <Stack direction="row" spacing={1} align="center">
                <Icon as={icon} boxSize={3} />
                <Text>{label}</Text>
              </Stack>
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
      paddingRight={2}
      align="center"
      width="full"
      direction={{ base: right ? 'column-reverse' : 'column', lg: 'row' }}
      justify="space-between">
      <Stack width="full">
        {!hideMobileLabels && <Heading>Stats</Heading>}
        <Stack
          paddingLeft={2}
          direction="row"
          width="full"
          paddingBottom={{ base: 2, lg: 0 }}
          align="center"
          wrap="wrap"
          shouldWrapChildren>
          {mainStats.map((statGroup, i) => {
            const { id, label, icon } = statGroup
            const buttonType = id === group ? ButtonTypes.stat.selected : ButtonTypes.stat.default
            return (
              <Button
                key={i}
                buttonType={buttonType}
                override={{
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
      </Stack>
      {right}
      {onPeriodChange && (
        <Stack width={{ base: 'full', lg: 80 }}>
          {!hideMobileLabels && <Heading>Period</Heading>}
          <Stack
            paddingLeft={2}
            direction="row"
            width="full"
            wrap="wrap"
            align="center"
            shouldWrapChildren>
            <Button
              buttonType={period === 'total' ? ButtonTypes.stat.selected : ButtonTypes.stat.default}
              onClick={() => onPeriodChange('total')}>
              <Stack direction="row" spacing={1} align="center">
                <Text>Total</Text>
              </Stack>
            </Button>
            <Button
              buttonType={period === '5min' ? ButtonTypes.stat.selected : ButtonTypes.stat.default}
              onClick={() => onPeriodChange('5min')}>
              <Stack direction="row" spacing={1} align="center">
                <Text>5-Min</Text>
              </Stack>
            </Button>
            <Button
              buttonType={!period ? ButtonTypes.stat.selected : ButtonTypes.stat.default}
              onClick={() => onPeriodChange('')}>
              <Stack direction="row" spacing={1} align="center">
                <Text>Game</Text>
              </Stack>
            </Button>
            <Button
              buttonType={
                period === 'series' ? ButtonTypes.stat.selected : ButtonTypes.stat.default
              }
              onClick={() => onPeriodChange('series')}>
              <Stack direction="row" spacing={1} align="center">
                <Text>Series</Text>
              </Stack>
            </Button>
          </Stack>
        </Stack>
      )}
    </Stack>
  )
}

export default StatsNavigation
