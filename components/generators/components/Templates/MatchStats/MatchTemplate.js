import React from 'react'
import styles from './MatchTemplate.module.scss'

import TeamStatsTable from './MatchStatsTable'

const OCTANE_TEAM_PHOTOS = 'https://griffon.octane.gg/team-logos/'

const TeamDisplay = ({ team }) => (
  <div className={styles.teamDisplay}>
    <img className={styles.teamPhoto} src={team.image || '/generators/DefaultTeamPic.png'} />
    <div className={styles.teamName}>{team.name}</div>
  </div>
)

const MatchTemplate = (props) => {
  const { data, org, photo, tableColor, textColor } = props

  console.log(data)

  return (
    <div id="photo-area" className={styles.matchStats} style={{ color: `${textColor} !important` }}>
      <img className={styles.templatePhoto} src={photo} crossOrigin="anonymous" />
      <div className={styles.teams}>
        <TeamDisplay team={data.blue.team.team} />
        <TeamDisplay team={data.orange.team.team} />
      </div>
      <div className={styles.matchScore}>
        <span>{data.blue.score || 0}</span>
        <span>{data.orange.score || 0}</span>
      </div>
      <div className={styles.matchGoals}>
        {`( ${data.blue.team.stats.core.goals} - ${data.orange.team.stats.core.goals} )`}
      </div>
      <TeamStatsTable
        team1={data.blue.players}
        team2={data.orange.players}
        teamSize={data.blue.players.length}
        games={data.games.length}
        textColor={textColor}
        tableColor={tableColor}
      />
      <div className={styles.eventName}>{data.event.name}</div>
    </div>
  )
}

export default MatchTemplate
