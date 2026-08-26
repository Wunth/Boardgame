import { useQuery } from '@tanstack/react-query'
import { getBoardgames } from '../apis/boardgames'
import DeleteBoardgame from './DeleteBoardgame'
import { Link } from 'react-router'

function BoardgameList() {
  const { data, isPending, isError } = useQuery({
    queryFn: () => getBoardgames(),
    queryKey: ['boardgames'],
  })
  if (isPending) return <p>Loading...</p>
  if (isError) return <p>Error</p>
  return (
    <>
      {data.map((bg) => (
        <p key={bg.id}>
          <Link to={`/${bg.id}`}>{bg.name}</Link> <DeleteBoardgame id={bg.id} />
        </p>
      ))}
    </>
  )
}

export default BoardgameList
