import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { EventInfobox } from '@octane/components/common/Infobox'
import { EventRecordsFilter } from '@octane/components/filters/EventFilters'
import { Flex, Stack } from '@chakra-ui/react'
import Meta from '@octane/components/common/Meta'
import RecordsRow from '@octane/components/records/Records'
import playerRecords from '@octane/config/records/records'
import { buildQuery } from '@octane/util/routes'
import { getRecordStat } from '@octane/util/stats'
import Loading from '@octane/components/common/Loading'
import { useOctane } from '@octane/context/octane'

const Event = ({ event, filter, records }) => {
  const { loadingSameRoute } = useOctane()

  return (
    <Content>
      <Meta title={`${event.name}: Player Records`} />
      <Stack width="full" spacing={3}>
        <EventInfobox event={event} />
        <Navigation type="event" active="records" baseHref={`/events/${event.slug}`} hasDivider />
        <EventRecordsFilter event={event} type="players" initialFilter={filter} />
        {loadingSameRoute ? (
          <Loading />
        ) : (
          <Flex direction="column">
            {records?.map((record, rank) => (
              <RecordsRow
                key={rank}
                statType={getRecordStat(playerRecords, filter.stat)}
                record={record}
                rank={rank + 1}
                isHighlighted
              />
            ))}
          </Flex>
        )}
      </Stack>
    </Content>
  )
}

export async function getServerSideProps({ req, params, query }) {
  const { id } = params

  const filter = {
    event: id,
    stat: query.stat || 'score',
    type: query.type || 'game',
    stage: query.stage || '',
  }

  const [_event, _records] = await Promise.all([
    fetch(`${process.env.API_URL}/events/${id}`),
    fetch(`${process.env.API_URL}/records/players${buildQuery(filter, [''])}`),
  ])
  if (_event.status !== 200) {
    return {
      notFound: true,
    }
  }

  const [event, { records }] = await Promise.all([_event.json(), _records.json()])

  return {
    props: {
      event,
      filter,
      records,
    },
  }
}

export default Event
