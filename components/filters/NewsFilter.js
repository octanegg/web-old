import { Filter, YearFilter } from '@octane/components/filters/Filter'
import { buildQuery, route } from '@octane/util/routes'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const NewsFilter = ({ initialFilter }) => {
  const router = useRouter()
  const [filter, setFilter] = useState(initialFilter)

  const updateFilter = (key, value) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value === 'All' ? '' : value,
    }))
  }

  return (
    <Filter
      onApply={() => route(router, '/news', buildQuery(filter, ''))}
      onReset={() => {
        setFilter({})
        route(router, '/news', '')
      }}>
      <YearFilter
        active={filter.year}
        onChange={(item) => updateFilter('year', item)}
        startYear={2017}
      />
    </Filter>
  )
}

export default NewsFilter
