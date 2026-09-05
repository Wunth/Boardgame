import { useState, FormEvent, ChangeEvent } from 'react'
import { BoardgameData } from '../../models/boardgames'

interface Props extends BoardgameData {
  submitLabel: string
  onSubmit: (data: BoardgameData) => void
}

export default function BoardgameForm({
  name,
  playerCount,
  playTime,
  category,
  bggRating,
  personalRating,
  status,
  bggObjectid,
  submitLabel,
  onSubmit,
}: Props) {
  const [formState, setFormState] = useState<BoardgameData>({
    name,
    playerCount,
    playTime,
    category,
    bggRating,
    personalRating,
    status,
    bggObjectid,
  })

  /*
  // to do: add a function to extract the bgg id from the url
  function extractBGGId(input: string): string {
    const trimmed = input.trim()
    if (!trimmed) return ''
    const bggid = trimmed.split("/boardgame/")
    return ''
  }
*/

  const handleChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, type, value } = evt.target
    // to do: incclude the option to convert the bgg link to bgg id
    // const { name, type, value: rawValue } = evt.target
    // const value = name === 'BGGLink' ? extractBGGId(rawValue) : rawValue
    setFormState((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }))
  }
  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault()
    // handle empty fields
    const dataToSubmit = { ...formState }
    if (!dataToSubmit.category) {
      dataToSubmit.category = 'n/a'
    }
    if (!dataToSubmit.status) {
      dataToSubmit.status = 'n/a'
    }
    if (!dataToSubmit.bggObjectid) {
      dataToSubmit.bggObjectid = 'n/a'
    }
    onSubmit(formState)
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <p>
        <label>
          Name
          <br />
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleChange}
            required
          />
        </label>
      </p>
      <p>
        <label>
          Number of players
          <br />
          <input
            type="text"
            name="playerCount"
            value={formState.playerCount}
            onChange={handleChange}
          />
        </label>
      </p>
      <p>
        <label>
          Play time (minutes)
          <br />
          <input
            type="text"
            name="playTime"
            value={formState.playTime}
            onChange={handleChange}
          />
        </label>
      </p>
      <p>
        <label>
          Category
          <br />
          <input
            type="text"
            name="category"
            value={formState.category}
            onChange={handleChange}
          />
        </label>
      </p>
      <p>
        <label>
          BGG rating
          <br />
          <input
            type="number"
            name="bggRating"
            value={formState.bggRating}
            onChange={handleChange}
          />
        </label>
      </p>
      <p>
        <label>
          Personal rating
          <br />
          <input
            type="number"
            name="personalRating"
            value={formState.personalRating}
            onChange={handleChange}
          />
        </label>
      </p>
      <p>
        <label>
          Status
          <br />
          <input
            type="text"
            name="status"
            value={formState.status}
            onChange={handleChange}
          />
        </label>
      </p>
      {/*
     // to do: add a field to add the bgg link
      <p>
        <label>
          boardgamegeek.com link
          <br />
          <input
            type="text"
            name="BGGLink"
            value={formState.status}
            onChange={handleChange}
          />
        </label>
      </p>
      */}
      <button type="submit">{submitLabel}</button>
    </form>
  )
}
