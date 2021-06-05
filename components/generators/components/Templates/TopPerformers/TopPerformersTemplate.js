import React from 'react'
import { calculateStat } from '@octane/util/stats'
import { getPlayerStat } from '@octane/config/stats/stats'
import styles from './TopPerformersTemplate.module.scss'

import PerformersStatsTable from './PerformersStateTable'

const TopPerformers = (props) => {
  const { data, minGames, org, photo, tableColor, textColor } = props

  return (
    <div
      id="photo-area"
      className={styles.topPerformers}
      style={{ color: `${textColor} !important` }}>
      <img className={styles.templatePhoto} src={photo} crossOrigin="anonymous" />
      <div className={styles.topText}>
        <div className={styles.orgName}>{org}</div>
        <div className={styles.topTen}>TOP 10</div>
        <div className={styles.eventName}>{data.stats[0].events[0].name}</div>
      </div>
      <PerformersStatsTable
        playersData={data.stats
          .filter((a) => a.games.total >= minGames)
          .sort(
            (a, b) =>
              calculateStat(b, getPlayerStat('rating'), '') -
              calculateStat(a, getPlayerStat('rating'), '')
          )
          .slice(0, 10)}
        tableColor={tableColor}
        textColor={textColor}
      />
    </div>
  )
}

export default TopPerformers
