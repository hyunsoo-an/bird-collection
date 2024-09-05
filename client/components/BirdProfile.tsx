import { useParams } from 'react-router-dom'
import { useBirdProfile } from '../hooks/useBirdProfiles'

function BirdProfile() {
  const { id } = useParams<{ id: string }>()
  const { data: bird, isLoading, isError, error } = useBirdProfile(Number(id))

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    console.error(error)
    return <p>Error: {error.message}</p>
  }

  return (
    <>
      <h1>Bird Profile</h1>
      <div>
        <p>
          <strong>Type:</strong> {bird.type}
        </p>
        <p>
          <strong>Color:</strong> {bird.color}
        </p>
        <p>
          <strong>Size:</strong> {bird.size}
        </p>
        <p>
          <strong>Habitat:</strong> {bird.habitat}
        </p>
      </div>
    </>
  )
}

export default BirdProfile
