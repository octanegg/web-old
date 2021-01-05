import { Content } from '../../../components/common/Layout'
import { Flex, Heading, Image, Stack, Text } from '@chakra-ui/core'
import { LabeledField } from '../../../components/common/Text'
import { toDateString } from '../../../util/dates'
import { Flag } from '../../../components/common/Flag'
import { formatPrize } from '../../../util/prizes'
import ButtonLink from '../../../components/common/Button'
import EventInfobox from '../../../components/events/EventInfobox'

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
