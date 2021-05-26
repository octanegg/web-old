import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import { PlayerInfobox } from '@octane/components/common/Infobox'
import { PlayerRecordsFilter } from '@octane/components/filters/PlayerFilters'
import { Flex, Stack } from '@chakra-ui/react'
import Meta from '@octane/components/common/Meta'
import RecordsRow from '@octane/components/records/Records'
import playerRecords from '@octane/config/records/records'
import { buildQuery } from '@octane/util/routes'
import { getRecordStat } from '@octane/util/stats'
import Loading from '@octane/components/common/Loading'
import { useOctane } from '@octane/context/octane'

const Player = ({ player, filter, records }) => {
  const { loadingSameRoute } = useOctane()

  return (
    <Content>
      <Meta title={`${player.tag}: Rocket League Records`} />
      <Stack width="full" spacing={3}>
        <PlayerInfobox player={player} />
        <Navigation
          type="player"
          active="records"
          baseHref={`/players/${player.slug}`}
          hasDivider
        />
        <PlayerRecordsFilter player={player} initialFilter={filter} />
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

export async function getServerSideProps({ params, query }) {
  const { id } = params

  const _player = await fetch(`${process.env.API_URL}/players/${id}`)
  if (_player.status !== 200) {
    return {
      notFound: true,
    }
  }

  const player = await _player.json()
  const filter = {
    player: player._id,
    mode: query.mode || 3,
    tier: query.tier || '',
    region: query.region || '',
    event: query.event || '',
    team: query.team || '',
    opponent: query.opponent || '',
    before: query.before || '',
    after: query.after || '',
    type: query.type || 'game',
    stat: query.stat || 'score',
    bestOf: query.bestOf || '',
  }

  const _records = await fetch(`${process.env.API_URL}/records/players${buildQuery(filter, [''])}`)

  const { records } = await _records.json()
  return {
    props: {
      player,
      filter,
      records,
    },
  }
}

export default Player
