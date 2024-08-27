import { useQuery } from '@tanstack/react-query'
import { getBirds } from '../apis/birdsApi'

function Birds() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['getBirds'],
    queryFn: () => getBirds(),
  })

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError) {
    console.error(error.message)
    return <p>Error...</p>
  }

  console.log('Birds Component', data)

  return (
    <>
      <h1>Birds</h1>
      {data.map((bird) => (
        <p key={bird.id}>{bird.name}</p>
      ))}
    </>
  )
}

export default Birds
