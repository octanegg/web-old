import { Stack } from '@chakra-ui/core'
import { useEffect, useState } from 'react'
import { Content } from '../../components/Layout'
import Filter, { SwitchFilter } from '../../components/filter/Filter'
import { DropdownButton, DropdownInput } from '../../components/filter/Dropdown'
import { useRouter } from 'next/router'
import RecordsTable from '../../components/records/RecordsTable'

const options = [
  {
    label: 'game',
    options: [
      { label: 'player', options: ['score', 'goals', 'assists', 'saves', 'shots', 'rating'] },
      // { label: 'team', options: ['score', 'goals', 'assists', 'saves', 'shots'] },
      // { label: 'total', options: ['score', 'goals', 'assists', 'saves', 'shots'] },
      // { label: 'differential', options: ['score', 'goals', 'assists', 'saves', 'shots'] },
      // { label: 'overtime', options: ['overtime'] },
    ],
  },
  // {
  //   label: 'match',
  //   options: [
  //     { label: 'player', options: ['score', 'goals', 'assists', 'saves', 'shots'] },
  //     { label: 'team', options: ['score', 'goals', 'assists', 'saves', 'shots'] },
  //     { label: 'total', options: ['score', 'goals', 'assists', 'saves', 'shots'] },
  //     { label: 'differential', options: ['score', 'goals', 'assists', 'saves', 'shots'] },
  //   ],
  // },
]

const Records = ({
  initialCategory,
  initialType,
  initialStat,
  initialTier,
  initialMode,
  initialPlayer,
}) => {
  const router = useRouter()
  const [category, setCategory] = useState(
    options.find((option) => option.label == initialCategory)
  )
  const [type, setType] = useState(
    category && category.options.find((option) => option.label == initialType)
  )
  const [stat, setStat] = useState(initialStat)
  const [tier, setTier] = useState(initialTier)
  const [mode, setMode] = useState(initialMode)
  const [player, setPlayer] = useState(initialPlayer)
  const [players, setPlayers] = useState([])

  useEffect(() => {
    const fetchPlayers = async () => {
      const res = await fetch(process.env.API_URL + `/players`)
      const data = await res.json()
      setPlayers(data.players)
    }
    fetchPlayers()
  }, [])

  useEffect(() => {
    const route = () => {
      const filter =
        `?mode=${mode}` + (tier ? `&tier=${tier}` : '') + (player ? `&player=${player}` : '')
      router.push(`/records/${stat}${filter}`)
    }
    route()
  }, [stat, tier, mode, player])

  return (
    <Content leftNav={<div></div>} rightNav={<div></div>}>
      <Stack direction="column" width="full">
        <Filter>
          <Stack width="full" direction={{ base: 'column', md: 'row' }}>
            <DropdownButton
              label="category"
              data={options}
              toString={(option) =>
                option ? option.label[0].toUpperCase() + option.label.substring(1) : 'Select...'
              }
              onChange={({ selectedItem }) => setCategory(selectedItem)}
              initialSelectedItem={category}
            />
            {category && (
              <DropdownButton
                label="type"
                data={category.options}
                toString={(option) =>
                  option ? option.label[0].toUpperCase() + option.label.substring(1) : 'Select...'
                }
                onChange={({ selectedItem }) => setType(selectedItem)}
                initialSelectedItem={type}
              />
            )}
            {type && (
              <DropdownButton
                label="stat"
                data={type.options}
                toString={(option) =>
                  option ? option[0].toUpperCase() + option.substring(1) : 'Select...'
                }
                onChange={({ selectedItem }) => setStat(selectedItem)}
                initialSelectedItem={stat}
              />
            )}
          </Stack>
          <Stack width="full" direction={{ base: 'column', md: 'row' }}>
            <DropdownButton
              label="tier"
              width={32}
              data={['All', 'S', 'A', 'B', 'C']}
              toString={(tier) => (tier ? tier : 'All')}
              onChange={({ selectedItem }) => setTier(selectedItem == 'All' ? '' : selectedItem)}
              initialSelectedItem={tier}
            />
            <DropdownButton
              label="mode"
              width={32}
              data={[3, 2, 1]}
              toString={(mode) => (mode ? `${mode}v${mode}` : 'Select...')}
              onChange={({ selectedItem }) => setMode(selectedItem)}
              initialSelectedItem={mode}
            />
            {players.length > 0 && (
              <DropdownInput
                label="player"
                width={56}
                data={players}
                toString={(player) => (player ? player.tag : 'Select...')}
                onChange={({ selectedItem }) => setPlayer(selectedItem._id)}
                initialSelectedItem={players.find((p) => p._id == player)}
              />
            )}
          </Stack>
        </Filter>
        <RecordsTable stat={stat} tier={tier} mode={mode} player={player} />
      </Stack>
    </Content>
  )
}

export async function getServerSideProps({ params, query }) {
  return {
    props: {
      initialCategory: 'game',
      initialType: 'player',
      initialStat: params.stat,
      initialMode: query.mode || 3,
      initialTier: query.tier || '',
      initialPlayer: query.player || '',
    },
  }
}

export default Records
