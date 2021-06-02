import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { EventInfobox } from '@octane/components/common/Infobox'
import { EventRecordsFilter } from '@octane/components/filters/EventFilters'
import { Flex, Stack } from '@chakra-ui/react'
import Meta from '@octane/components/common/Meta'
import { gameRecords } from '@octane/config/records/records'
import Loading from '@octane/components/common/Loading'
import { useOctane } from '@octane/context/octane'
import RecordsRow from '@octane/components/records/Records'
import { getRecordStat } from '@octane/util/stats'
import { buildQuery } from '@octane/util/routes'

const Event = ({ event, filter, records }) => {
  const { loadingSameRoute } = useOctane()

  return (
    <Content>
      <Meta title={`${event.name}: Game Records`} />
      <Stack width="full" spacing={3}>
        <EventInfobox event={event} />
        <Navigation
          type="event"
          active="records"
          filter={{ ...(event.tier !== 'Qualifier' && { qualifier: false }) }}
          ignoreFilter={['matches', 'records', 'admin']}
          baseHref={`/events/${event.slug}`}
          hasDivider
        />
        <EventRecordsFilter event={event} type="games" initialFilter={filter} />
        {loadingSameRoute ? (
          <Loading />
        ) : (
          <Flex direction="column">
            {records?.map((record, rank) => (
              <RecordsRow
                key={rank}
                statType={getRecordStat(gameRecords, filter.stat)}
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

export async function getServerSideProps({ params, query }) {
  const { id } = params

  const filter = {
    event: id,
    stat: query.stat || 'scoreTotal',
    stage: query.stage || '',
  }

  const [_event, _records] = await Promise.all([
    fetch(`${process.env.API_URL}/events/${id}`),
    fetch(`${process.env.API_URL}/records/games${buildQuery(filter, [''])}`),
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
