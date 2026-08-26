import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createBoardgame } from '../apis/boardgames'
import { BoardgameData } from '../../models/boardgames'

const initialFormState: BoardgameData = {
  name: '',
  playerCount: '',
  playTime: '',
  category: '',
  bggRating: '',
  personalRating: '',
  status: '',
}

function AddBoardgame() {
  const queryClient = useQueryClient()

  const [formData, setFormData] = useState<BoardgameData>(initialFormState)

  const addMutation = useMutation({
    mutationFn: (data: BoardgameData) => createBoardgame(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boardgames'] })
    },
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]:
        type === 'checkbox'
          ? checked
          : type === 'number'
            ? Number(value)
            : value,
    }))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    addMutation.mutate(formData)

    setFormData(initialFormState)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Number of players
        <input
          type="text"
          name="playerCount"
          value={formData.playerCount}
          onChange={handleChange}
        />
      </label>
      <label>
        Play time (minutes)
        <input
          type="number"
          name="playTime"
          value={formData.playTime}
          onChange={handleChange}
        />
      </label>
      <label>
        category
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
      </label>
      <label>
        BGG rating
        <input type="number" name="bggRating" onChange={handleChange} />
      </label>
      <label>
        Personal Rating
        <input type="number" name="personalRating" onChange={handleChange} />
      </label>
      <label>
        Status
        <input type="text" name="isNorthIsland" onChange={handleChange} />
      </label>
      <button type="submit">Add Boardgame</button>
    </form>
  )
}

export default AddBoardgame
