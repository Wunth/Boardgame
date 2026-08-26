import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteBoardgame } from '../apis/boardgames'
import { useNavigate } from 'react-router'

interface Props {
  id: number
}

function DeleteBoardgame(props: Props) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const deleteMutation = useMutation({
    mutationFn: () => deleteBoardgame(props.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boardgames'] })
      navigate('/')
    },
  })

  const handleClick = () => {
    deleteMutation.mutate()
  }

  return (
    <>
      <p>
        <button onClick={() => handleClick()}>Delete</button>
      </p>
    </>
  )
}

export default DeleteBoardgame
