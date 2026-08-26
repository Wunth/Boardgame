import { useParams, useNavigate } from 'react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getBoardgameById, updateBoardgame } from '../apis/boardgames'
import { BoardgameData } from '../../models/boardgames'
import BoardgameForm from './BoardgameForm'
import DeleteBoardgame from './DeleteBoardgame'

export default function EditBoardgame() {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

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

  const editMutation = useMutation({
    mutationFn: (data: BoardgameData) => updateBoardgame(Number(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boardgames'] })
      queryClient.invalidateQueries({ queryKey: ['boardgame', id] })
      navigate(`/${id}`)
    },
  })

  if (!id) return <span>No boardgame with that id.</span>
  if (isPending) return <p>Loading...</p>
  if (isError) return <span>Error: {error.message}</span>

  return (
    <div className="formContainer">
      <BoardgameForm
        {...boardgame}
        submitLabel="Save"
        onSubmit={(data) => editMutation.mutate(data)}
      />
      <p>
        <a
          href={`https://boardgamegeek.com/boardgame/${boardgame.bggObjectid}`}
          target="_blank"
          rel="noreferrer"
        >
          BGG link
        </a>
      </p>
      <DeleteBoardgame id={Number(id)} />
    </div>
  )
}
