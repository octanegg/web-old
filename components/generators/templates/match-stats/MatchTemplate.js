import './MatchTemplate.scss'

import React from 'react'
import TeamStatsTable from './MatchStatsTable'

const OCTANE_TEAM_PHOTOS = 'https://griffon.octane.gg/team-logos/'

const TeamDisplay = ({ teamName }) => (
  <div className="team-display">
    <img
      className="team-photo"
      src={`${OCTANE_TEAM_PHOTOS}${teamName}.png`}
      crossOrigin="anonymous"
    />
    <div className="team-name">{teamName}</div>
  </div>
)

const MatchTemplate = (props) => {
  const {
    data,
    data: { Match },
    org,
    photo,
    tableColor,
    textColor,
  } = props

  return (
    <div id="photo-area" className="match-stats" style={{ color: `${textColor} !important` }}>
      <img className="template-photo" src={photo} crossOrigin="anonymous" />
      <div className="teams">
        <TeamDisplay teamName={Match.Team1} />
        <TeamDisplay teamName={Match.Team2} />
      </div>
      <div className="match-score">
        <span>{Match.Team1Games}</span>
        <span>{Match.Team2Games}</span>
      </div>
      <div className="match-goals">{`( ${Match.Team1Goals} - ${Match.Team2Goals} )`}</div>
      <TeamStatsTable
        team1={data.Team1}
        team2={data.Team2}
        teamSize={data.Team1.length}
        textColor={textColor}
        tableColor={tableColor}
      />
      <div className="event-name">{Match.Event}</div>
    </div>
  )
}

export default MatchTemplate
