import { TeamInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'
import Matches from '@octane/components/matches/Matches'

const Team = ({ team }) => {
  return (
    <Content>
      <TeamInfobox team={team} />
      <Navigation type="team" active="matches" baseHref={`/teams/${team._id}`} hasDivider />
      <Matches filter={{ team: team._id, page: 1, perPage: 50, sort: 'date:desc' }} />
    </Content>
  )
}

export async function getServerSideProps({ params }) {
  const { id } = params
  const res = await fetch(process.env.API_URL + `/teams/${id}`)
  const team = await res.json()
  return {
    props: { team },
  }
}

export default Team
