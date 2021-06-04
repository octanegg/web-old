import './PerformersStatsTable.scss'

import React from 'react'
import { NumberFormatter } from '../../../util/numbers'

export default class PerformersStatsTable extends React.PureComponent {
  componentWillMount() {
    this.setState({ columnOrder: Object.keys(this.props.playersData[0]) })
  }

  state = {
    columnOrder: null,
    removedColumns: [],
  }

  render() {
    const { playersData, tableColor, textColor } = this.props
    const { columnOrder, removedColumns } = this.state

    const filteredColumns = columnOrder.filter(
      (_) => _ !== 'Team' && !removedColumns.some((col) => col === _)
    )

    return (
      <table className="table players-stats-table">
        <thead>
          <tr>
            {filteredColumns.map((column) => (
              <td style={{ borderColor: tableColor }} key={column}>
                {column}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {playersData.map((playerData, index) => (
            <tr key={playerData.Player}>
              {filteredColumns.map((field, j) => (
                <td style={{ borderColor: tableColor }} key={j}>
                  {!isNaN(playerData[field]) ? (
                    NumberFormatter(field, playerData[field])
                  ) : field === 'Player' ? (
                    <>
                      <span className="position">#{index + 1}</span> {playerData[field]}
                    </>
                  ) : (
                    playerData[field]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}
