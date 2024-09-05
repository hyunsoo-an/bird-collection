import { useParams, useNavigate } from 'react-router-dom'
import { useBirdProfile } from '../hooks/useBirdProfiles'
import { deleteBirdById } from '../apis/birdsApi'

function BirdProfile() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: bird, isLoading, isError, error } = useBirdProfile(Number(id))

  const handleDelete = async () => {
    try {
      await deleteBirdById(Number(id))
      navigate('/')
    } catch (error) {
      return error
    }
  }

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
      <div className="bird-profile-container">
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
        <button onClick={handleDelete} className="delete-button">
          Delete Bird
        </button>
      </div>
    </>
  )
}

export default BirdProfile
