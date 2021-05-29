import { Flex } from '@chakra-ui/react'
import { Button, ButtonTypes } from '@octane/components/common/Button'
import { useState } from 'react'
import { MatchesWidget } from '@octane/components/widgets/Matches'

export const Matches = ({ matches }) => {
  const { completed, upcoming } = matches
  const [toggle, setToggle] = useState(false)

  return (
    <Flex direction="column" minWidth={60}>
      <Flex justify="space-around" marginBottom={2} display={{ base: 'none', lg: 'flex' }}>
        <Button
          buttonType={toggle ? ButtonTypes.link.selected : ButtonTypes.link.default}
          isActive={toggle}
          onClick={() => setToggle(true)}>
          Matches
        </Button>
        <Button
          buttonType={!toggle ? ButtonTypes.link.selected : ButtonTypes.link.default}
          isActive={!toggle}
          onClick={() => setToggle(false)}>
          Results
        </Button>
      </Flex>
      <MatchesWidget matches={toggle ? upcoming : completed} />
    </Flex>
  )
}

export default Matches
