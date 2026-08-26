import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteBoardgame } from '../apis/boardgames'

interface Props {
  id: number
}

function DeleteBoardgame(props: Props) {
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: () => deleteBoardgame(props.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boardgames'] })
    },
  })

  const handleClick = () => {
    // console.log(props.id)
    deleteMutation.mutate()
  }

  return (
    <>
      <button onClick={() => handleClick()}>Delete {props.id}</button>
    </>
  )
}

export default DeleteBoardgame
