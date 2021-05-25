import { Input } from '@octane/components/common/Input'
import { FormField } from '@octane/components/forms/Forms'
import { useState } from 'react'
import { apiCreate, apiDelete, apiUpdate } from '@octane/util/api'
import { PlayerSelect, Select } from '@octane/components/common/Select'
import { Spacer, Stack, Switch, Text } from '@chakra-ui/react'
import { cleanObj } from '@octane/util/stats'
import { Button, ButtonTypes } from '@octane/components/common/Button'
import Image from '@octane/components/common/Image'

export const GameForm = ({ data, match, playerList }) => {
  const [game, setGame] = useState(data)
  const [flipBallchasing, setFlipBallchasing] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const updateGame = (key, value) => {
    const g = cleanObj({
      ...game,
      [key]: value,
    })
    setGame(g)
  }

  const updatePlayer = (side, i, player) => {
    if (!game[side]) {
      game[side] = {
        players: [],
      }
    }
    const { players } = game[side]
    updateGame(side, {
      ...game[side],
      players: [].concat((players || []).slice(0, i), player, (players || []).slice(i + 1)),
    })
  }

  const handleDelete = async () => {
    const res = await apiDelete(`/games/${game._id}`)
    if (res.status === 200) {
      window.location.reload()
    }
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    const payload = {
      number: game.number,
      match,
      blue: {
        team: {
          team: match.blue.team.team,
        },
      },
      orange: {
        team: {
          team: match.orange.team.team,
        },
      },
    }

    if (game.ballchasing) {
      payload.ballchasing = game.ballchasing
      payload.flipBallchasing = flipBallchasing
    } else {
      payload.map = game.map
      payload.duration = game.duration
      payload.date = game.date
    }

    if (game._id || !game.ballchasing) {
      payload.blue.players =
        game.blue?.players?.map(({ player, stats }) => ({
          player,
          stats,
        })) || []
      payload.orange.players =
        game.orange?.players?.map(({ player, stats }) => ({
          player,
          stats,
        })) || []
    }

    if (game._id) {
      const res = await apiUpdate(`/games/${game._id}`, payload)
      if (res.status === 200) {
        window.location.reload()
      }
    } else {
      const res = await apiCreate(`/games`, payload)
      if (res.status === 200) {
        window.location.reload()
      }
    }
  }

  return (
    <Stack width="full">
      <Stack direction="row" spacing={4}>
        <FormField label="Number">
          <Input
            id="number"
            width={14}
            borderRadius={4}
            value={game?.number}
            type="number"
            onChange={(e) => updateGame('number', parseInt(e.currentTarget.value, 10))}
          />
        </FormField>
        {game._id && (
          <FormField label="ID">
            <Input borderRadius={4} value={game._id} isDisabled />
          </FormField>
        )}
        <FormField label="Ballchasing ID">
          <Input
            id="ballchasing"
            width={80}
            borderRadius={4}
            value={game?.ballchasing}
            onChange={(e) => updateGame('ballchasing', e.currentTarget.value)}
          />
        </FormField>
        <FormField label="Flip?">
          <Switch
            isChecked={flipBallchasing}
            onChange={() => setFlipBallchasing(!flipBallchasing)}
          />
        </FormField>
        <Spacer />
        {game._id && (
          <Button buttonType={ButtonTypes.cancel} onClick={handleDelete} isDisabled={submitting}>
            <Text>Delete</Text>
          </Button>
        )}
        <Button buttonType={ButtonTypes.submit} onClick={handleSubmit} isDisabled={submitting}>
          <Text>Update</Text>
        </Button>
      </Stack>
      {!game.ballchasing && (
        <Stack direction="row" spacing={4}>
          <FormField label="Map">
            <Select
              id="map"
              width={64}
              value={game?.map?.name || 'DFH Stadium'}
              onChange={(e) => updateGame('map', { name: e.currentTarget.value })}>
              <option value="Aquadome">Aquadome</option>
              <option value="Beckwith Park">Beckwith Park</option>
              <option value="Champions Field">Champions Field</option>
              <option value="DFH Stadium">DFH Stadium</option>
              <option value="Farmstead">Farmstead</option>
              <option value="Forbidden Temple">Forbidden Temple</option>
              <option value="Mannfield">Mannfield</option>
              <option value="Neo Tokyo">Neo Tokyo</option>
              <option value="Neon Fields">Neon Fields</option>
              <option value="Rivals Arena">Rivals Arena</option>
              <option value="Salty Shores">Salty Shores</option>
              <option value="Starbase ARC">Starbase ARC</option>
              <option value="Throwback Stadium">Throwback Stadium</option>
              <option value="Urban Central">Urban Central</option>
              <option value="Utopia Coliseum">Utopia Coliseum</option>
              <option value="Wasteland">Wasteland</option>
            </Select>
          </FormField>
          <FormField label="Duration">
            <Input
              id="duration"
              width={20}
              borderRadius={4}
              value={game?.duration}
              type="number"
              onChange={(e) => updateGame('duration', parseInt(e.currentTarget.value, 10))}
            />
          </FormField>
        </Stack>
      )}
      <FormField
        label={
          <Stack direction="row">
            <Image boxSize={4} src={match?.blue?.team?.team.image} />
            <Text>{match.blue?.team?.team.name || 'TBD'}</Text>
          </Stack>
        }>
        {[...Array(match.event.mode).keys()].map((i) => (
          <PlayerRow
            key={i}
            players={playerList}
            player={
              game?.blue?.players
                ? game.blue.players[i]
                : {
                    stats: { core: { score: 0, goals: 0, assists: 0, saves: 0, shots: 0 } },
                  }
            }
            updatePlayer={(player) => updatePlayer('blue', i, player)}
            isBallchasing={game.ballchasing}
          />
        ))}
      </FormField>
      <FormField
        label={
          <Stack direction="row">
            <Image boxSize={4} src={match?.orange?.team?.team.image} />
            <Text>{match.orange?.team?.team.name || 'TBD'}</Text>
          </Stack>
        }>
        {[...Array(match.event.mode).keys()].map((i) => (
          <PlayerRow
            key={i}
            players={playerList}
            player={
              game?.orange?.players
                ? game.orange.players[i]
                : {
                    stats: { core: { score: 0, goals: 0, assists: 0, saves: 0, shots: 0 } },
                  }
            }
            updatePlayer={(player) => updatePlayer('orange', i, player)}
            isBallchasing={game.ballchasing}
          />
        ))}
      </FormField>
    </Stack>
  )
}

export const PlayerRow = ({ players, player, updatePlayer, isBallchasing }) => (
  <Stack direction="row" spacing={4} paddingLeft={4}>
    <FormField label="Player">
      <PlayerSelect
        players={players}
        active={player?.player}
        onChange={(p) => {
          updatePlayer({ ...player, player: p })
        }}
      />
    </FormField>
    {!isBallchasing &&
      ['Score', 'Goals', 'Assists', 'Saves', 'Shots'].map((stat) => (
        <FormField label={stat} key={stat}>
          <Input
            id={stat}
            width={16}
            borderRadius={4}
            value={player?.stats?.core[stat.toLowerCase()] || 0}
            type="number"
            onChange={(e) =>
              updatePlayer({
                ...player,
                stats: {
                  core: {
                    ...player?.stats?.core,
                    [stat.toLowerCase()]: parseInt(e.currentTarget.value, 10),
                  },
                },
              })
            }
          />
        </FormField>
      ))}
  </Stack>
)

export default GameForm
