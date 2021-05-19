import { Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Loading from '@octane/components/common/Loading'
import { apiFetch } from '@octane/util/fetch'
import { buildQuery } from '@octane/util/routes'
import { getRecordStat } from '@octane/util/stats'
import { seriesRecords } from '@octane/config/records/records'
import RecordsRow from '@octane/components/records/Records'

export const SeriesRecords = ({ filter, isHighlighted }) => {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecords = async () => {
      setRecords([])
      setLoading(true)

      const data = await apiFetch('/records/series', buildQuery(filter, ['']))
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
          statType={getRecordStat(seriesRecords, filter.stat)}
          record={record}
          rank={rank + 1}
          isHighlighted={isHighlighted}
        />
      ))}
    </Flex>
  )
}

export default SeriesRecords
