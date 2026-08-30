import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { getBoardgameById } from '../apis/boardgames.ts'
import { Link } from 'react-router'

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
      <h2>{boardgame.name}</h2>
      <p className="playerCount">Player count: {boardgame.playerCount}</p>
      <p className="playTime">Play time: {boardgame.playTime}</p>
      <p className="category">
        Category: {boardgame.category ? boardgame.category : '(blank)'}
      </p>
      <p className="bggRating">
        BGG Rating: {Math.round(Number(boardgame.bggRating) * 10) / 10}
      </p>
      <p className="personalRating">My rating: {boardgame.personalRating}</p>
      <p className="status">Status: {boardgame.status}</p>
      <p>
        <a
          href={`https://boardgamegeek.com/boardgame/${boardgame.bggObjectid}`}
          target="_blank"
          rel="noreferrer"
        >
          BGG link
        </a>
      </p>

      <p>
        <Link to={`/edit/${boardgame.id}`}>Edit this game</Link>
      </p>
      <p>
        <Link to={'/'}>Back to list</Link>
      </p>
    </div>
  )
}
