import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { createBoardgame } from '../apis/boardgames'
import { BoardgameData } from '../../models/boardgames'
import BoardgameForm from './BoardgameForm'

const emptyBoardgame: BoardgameData = {
  name: '',
  playerCount: '',
  playTime: '',
  category: '',
  bggRating: '',
  personalRating: '',
  status: '',
  bggObjectid: '',
}

export default function AddBoardgame() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const addMutation = useMutation({
    mutationFn: (data: BoardgameData) => createBoardgame(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boardgames'] })
      navigate('/')
    },
  })

  return (
    <BoardgameForm
      {...emptyBoardgame}
      submitLabel="Add"
      onSubmit={(data) => addMutation.mutate(data)}
    />
  )
}
