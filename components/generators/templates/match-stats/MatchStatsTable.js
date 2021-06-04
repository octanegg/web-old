import './MatchStatsTable.scss'

import React from 'react'
import numeral from 'numeral'
import { NumberFormatter } from '../../../util/numbers'

export default class MatchStatsTable extends React.PureComponent {
  componentWillMount() {
    this.setState({ columnOrder: Object.keys(this.props.team1[0]) })
  }

  state = {
    columnOrder: null,
    removedColumns: [],
  }

  render() {
    const { team1, team2, teamSize, tableColor, textColor } = this.props
    const { columnOrder, removedColumns } = this.state

    const filteredColumns = columnOrder.filter(
      (_) => _ !== 'Team' && !removedColumns.some((col) => col === _)
    )
    const sortedTeam1 = team1.sort(this._sortPlayerByRating)
    const sortedTeam2 = team2.sort(this._sortPlayerByRating)

    return (
      <table className="table match-data-table" style={{ color: textColor }}>
        <thead>
          <tr>
            {filteredColumns.map((columnName) => (
              <td style={{ borderColor: tableColor }} key={columnName}>
                {columnName}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedTeam1.map((playerData, i) => (
            <tr key={`1-${i}`}>
              {filteredColumns.map((field, j) => (
                <td style={{ borderColor: tableColor }} key={j}>
                  {!isNaN(playerData[field])
                    ? NumberFormatter(field, playerData[field])
                    : playerData[field]}
                </td>
              ))}
            </tr>
          ))}
          <tr key="sep" className="seperator"></tr>
          {sortedTeam2.map((playerData, i) => (
            <tr key={`2-${i}`}>
              {filteredColumns.map((field, j) => (
                <td style={{ borderColor: tableColor }} key={j}>
                  {!isNaN(playerData[field])
                    ? NumberFormatter(field, playerData[field])
                    : playerData[field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  _sortPlayerByRating = (a, b) => b.Rating - a.Rating
}
