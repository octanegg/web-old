import { TeamInfobox } from '@octane/components/common/Infobox'
import { Content } from '@octane/components/common/Layout'
import Navigation from '@octane/components/common/Navigation'

const Team = ({ team }) => {
  return (
    <Content>
      <TeamInfobox team={team} />
      <Navigation type="team" active="overview" baseHref={`/teams/${team._id}`} hasDivider />
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
