import { getPlayerStat } from '@octane/config/stats/stats'
import { calculateStat } from '@octane/util/stats'
import React from 'react'
import styles from './PerformersStatsTable.module.scss'

export default class PerformersStatsTable extends React.PureComponent {
  render() {
    const { playersData, tableColor } = this.props

    return (
      <table className={styles.playersStatsTable}>
        <thead>
          <tr>
            <td style={{ borderColor: tableColor }}>Player</td>
            <td style={{ borderColor: tableColor }}>Games</td>
            <td style={{ borderColor: tableColor }}>Score</td>
            <td style={{ borderColor: tableColor }}>Goals</td>
            <td style={{ borderColor: tableColor }}>Assists</td>
            <td style={{ borderColor: tableColor }}>Saves</td>
            <td style={{ borderColor: tableColor }}>Shots</td>
            <td style={{ borderColor: tableColor }}>Shot %</td>
            <td style={{ borderColor: tableColor }}>GP %</td>
            <td style={{ borderColor: tableColor }}>Rating</td>
          </tr>
        </thead>
        <tbody>
          {playersData.map((playerData, index) => (
            <tr key={playerData.Player}>
              <td style={{ borderColor: tableColor }}>
                <span className={styles.position}>#{index + 1}</span> {playerData.player.tag}
              </td>
              <td style={{ borderColor: tableColor }}>
                {calculateStat(playerData, getPlayerStat('played'), '')}
              </td>
              <td style={{ borderColor: tableColor }}>
                {calculateStat(playerData, getPlayerStat('score'), '')}
              </td>
              <td style={{ borderColor: tableColor }}>
                {calculateStat(playerData, getPlayerStat('goals'), '')}
              </td>
              <td style={{ borderColor: tableColor }}>
                {calculateStat(playerData, getPlayerStat('assists'), '')}
              </td>
              <td style={{ borderColor: tableColor }}>
                {calculateStat(playerData, getPlayerStat('saves'), '')}
              </td>
              <td style={{ borderColor: tableColor }}>
                {calculateStat(playerData, getPlayerStat('shots'), '')}
              </td>
              <td style={{ borderColor: tableColor }}>
                {calculateStat(playerData, getPlayerStat('shootingPercentage'), '')}
              </td>
              <td style={{ borderColor: tableColor }}>
                {calculateStat(playerData, getPlayerStat('goalParticipation'), '')}
              </td>
              <td style={{ borderColor: tableColor }}>
                {calculateStat(playerData, getPlayerStat('rating'), '')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}
