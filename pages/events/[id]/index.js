import { Content } from '@octane/components/common/Layout'
import { Flex, Heading, Image, Stack, Text } from '@chakra-ui/core'
import { LabeledField } from '@octane/components/common/Text'
import { toDateString } from '@octane/util/dates'
import { Flag } from '@octane/components/common/Flag'
import { formatPrize } from '@octane/util/prizes'
import ButtonLink from '@octane/components/common/Button'
import EventInfobox from '@octane/components/events/EventInfobox'

const Event = ({ event }) => {
  return (
    <Content>
      <EventInfobox event={event} />
      <Stack direction="row" width="full" paddingLeft={4} paddingRight={4}>
        <ButtonLink isActive>Overview</ButtonLink>
        <ButtonLink>Matches</ButtonLink>
        <ButtonLink>Stats</ButtonLink>
        <ButtonLink>Records</ButtonLink>
      </Stack>
    </Content>
  )
}

export async function getServerSideProps({ params }) {
  const { id } = params
  const res = await fetch(process.env.API_URL + `/events/${id}`)
  const event = await res.json()
  return {
    props: { event },
  }
}

export default Event
