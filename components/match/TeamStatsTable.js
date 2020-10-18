import styles from './TeamStatsTable.module.scss'

import numeral from 'numeral'

// TODO: Clean up
const TeamStatsTable = (props) => {
  const renameFields = (value) => {
    const { isOverview } = props

    switch (value) {
      case 'shots':
        return isOverview ? 'SHPG' : 'Shots'
      case 'goals':
        return isOverview ? 'GPG' : 'Goals'
      case 'saves':
        return isOverview ? 'SAPG' : 'Saves'
      case 'assists':
        return isOverview ? 'APG' : 'Assists'
      case 'score':
        return isOverview ? 'SPG' : 'Score'
      case 'rating':
        return 'Rating'
    }
  }

  const { data, isOverview, orderBy, columns } = props
  const playersOrder = Object.keys(data).sort(
    (a, b) => data[b][orderBy || 'rating'] - data[a][orderBy || 'rating']
  )

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Player</th>
          {(columns || Object.keys(Object.values(data)[0])).map((stat) => (
            <th key={stat}>{renameFields(stat)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {playersOrder.map((player) => (
          <tr key={player}>
            <td>{player}</td>
            {(columns || Object.keys(data[player])).map((stat) => (
              <td key={`${player}|${stat}`}>
                {numeral(data[player][stat]).format(isOverview || stat === 'rating' ? '0.00' : '0')}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TeamStatsTable
