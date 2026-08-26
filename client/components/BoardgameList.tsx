import { useQuery } from '@tanstack/react-query'
import { getBoardgames } from '../apis/boardgames'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'

function BoardgameList() {
  const navigate = useNavigate()
  const { data, isPending, isError } = useQuery({
    queryFn: () => getBoardgames(),
    queryKey: ['boardgames'],
  })
  if (isPending) return <p>Loading...</p>
  if (isError) return <p>Error</p>
  return (
    <>
      <button type="button" onClick={() => navigate('/add')}>
        Add a game to the collection
      </button>

      {data.map((bg) => (
        <p key={bg.id}>
          <Link to={`/${bg.id}`}>{bg.name}</Link>
        </p>
      ))}
    </>
  )
}

export default BoardgameList
