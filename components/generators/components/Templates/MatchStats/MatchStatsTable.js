import styles from './MatchStatsTable.module.scss'

import React from 'react'
import { formatStatFromObj, getFieldFromObj } from '@octane/util/stats'
import { getPlayerStat } from '@octane/config/stats/stats'

export default class MatchStatsTable extends React.PureComponent {
  render() {
    const { team1, team2, games, teamSize, tableColor, textColor } = this.props

    const sortedTeam1 = team1.sort(this._sortPlayerByRating)
    const sortedTeam2 = team2.sort(this._sortPlayerByRating)

    return (
      <table className={`${styles.table} ${styles.matchDataTable}`} style={{ color: textColor }}>
        <thead>
          <tr>
            <td style={{ borderColor: tableColor }}>Player</td>
            <td style={{ borderColor: tableColor }}>Score</td>
            <td style={{ borderColor: tableColor }}>Goals</td>
            <td style={{ borderColor: tableColor }}>Assists</td>
            <td style={{ borderColor: tableColor }}>Saves</td>
            <td style={{ borderColor: tableColor }}>Shots</td>
            <td style={{ borderColor: tableColor }}>SH %</td>
            <td style={{ borderColor: tableColor }}>GP %</td>
            <td style={{ borderColor: tableColor }}>Rating</td>
          </tr>
        </thead>
        <tbody>
          {sortedTeam1.map((playerData, i) => (
            <tr key={`1-${i}`}>
              <td style={{ borderColor: tableColor }}>{playerData.player.tag}</td>
              {['score', 'goals', 'assists', 'saves', 'shots'].map((stat) => (
                <td style={{ borderColor: tableColor }}>
                  {(getFieldFromObj(playerData, getPlayerStat(stat).field) / games).toFixed(2)}
                </td>
              ))}
              <td style={{ borderColor: tableColor }}>
                {formatStatFromObj(playerData, getPlayerStat('shootingPercentage'), games)}
              </td>
              <td style={{ borderColor: tableColor }}>
                {formatStatFromObj(playerData, getPlayerStat('goalParticipation'), games)}
              </td>
              <td style={{ borderColor: tableColor }}>
                {formatStatFromObj(playerData, getPlayerStat('rating'), games)}
              </td>
            </tr>
          ))}
          <tr key="sep" className={styles.separator}></tr>
          {sortedTeam2.map((playerData, i) => (
            <tr key={`2-${i}`}>
              <td style={{ borderColor: tableColor }}>{playerData.player.tag}</td>
              {['score', 'goals', 'assists', 'saves', 'shots'].map((stat) => (
                <td style={{ borderColor: tableColor }}>
                  {(getFieldFromObj(playerData, getPlayerStat(stat).field) / games).toFixed(2)}
                </td>
              ))}
              <td style={{ borderColor: tableColor }}>
                {formatStatFromObj(playerData, getPlayerStat('shootingPercentage'), games)}
              </td>
              <td style={{ borderColor: tableColor }}>
                {formatStatFromObj(playerData, getPlayerStat('goalParticipation'), games)}
              </td>
              <td style={{ borderColor: tableColor }}>
                {formatStatFromObj(playerData, getPlayerStat('rating'), games)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  _sortPlayerByRating = (a, b) => b.advanced.rating - a.advanced.rating
}
