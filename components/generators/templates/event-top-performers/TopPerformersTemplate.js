import './TopPerformersTemplate.scss'

import React from 'react'
import PerformersStatsTable from './PerformersStateTable'

const TopPerformers = (props) => {
  const {
    data,
    data: { Event },
    org,
    photo,
    tableColor,
    textColor,
  } = props

  return (
    <div id="photo-area" className="top-performers" style={{ color: `${textColor} !important` }}>
      <img className="template-photo" src={photo} crossOrigin="anonymous" />
      <div className="top-text">
        <div className="org-name">{org}</div>
        <div className="top-ten">TOP 10</div>
        <div className="event-name">{Event}</div>
      </div>
      <PerformersStatsTable
        playersData={data.Stats?.slice(0, 10)}
        tableColor={tableColor}
        textColor={textColor}
    </div>
  )
}

export default TopPerformers
