import { Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Loading from '@octane/components/common/Loading'
import { apiFetch } from '@octane/util/fetch'
import { buildQuery } from '@octane/util/routes'
import { getRecordStat } from '@octane/util/stats'
import { gameRecords } from '@octane/config/records/records'
import RecordsRow from '@octane/components/records/Records'

export const GameRecords = ({ filter, isHighlighted }) => {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecords = async () => {
      setRecords([])
      setLoading(true)

      const data = await apiFetch('/records/games', buildQuery(filter, ['']))
      if (!data) {
        return
      }

      setRecords(data.records)
      setLoading(false)
    }
    fetchRecords()
  }, [filter])

  return loading ? (
    <Loading />
  ) : (
    <Flex direction="column">
      {records?.map((record, rank) => (
        <RecordsRow
          key={rank}
          statType={getRecordStat(gameRecords, filter.stat)}
          record={record}
          rank={rank + 1}
          isHighlighted={isHighlighted}
        />
      ))}
    </Flex>
  )
}

export default GameRecords
