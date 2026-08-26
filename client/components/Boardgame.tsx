import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { getBoardgameById } from '../apis/boardgames.ts'

export default function Boardgame() {
  const { id } = useParams()

  const {
    data: boardgame,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['boardgame', id],
    queryFn: () => getBoardgameById(Number(id)),
    enabled: Boolean(id),
  })

  if (!id) {
    return <span>No boardgame with that id.</span>
  }

  if (isPending) {
    return <p>Loading</p>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <div>
      <h2>Boardgame: {boardgame.name}</h2>
    </div>
  )
}
