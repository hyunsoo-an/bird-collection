import { useParams, useNavigate, Link } from 'react-router-dom'
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
      console.error(error)
    }
  }

  if (isLoading) {
    return <p className="text-center">Loading...</p>
  }

  if (isError) {
    console.error(error)
    return <p className="text-center text-red-500">Error: {error.message}</p>
  }

  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{
        backgroundImage: 'url(/images/bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent pointer-events-none"></div>
      <div className="max-w-lg p-6 bg-white shadow-md rounded-lg relative">
        <div className="absolute top-4 right-4 space-x-2">
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
          <Link to={`/birds/${id}/edit`}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Edit
            </button>
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-4">Bird Profile</h1>
        <div className="mb-4">
          <img
            src={bird.image || '/images/bird-profile.jpg'}
            alt={`Profile of ${bird.name}`}
            className="w-full h-80 object-cover rounded"
          />
          <p className="text-lg mt-3">
            <strong>Name:</strong> {bird.name}
          </p>
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
          <p>
            <strong>Fly:</strong> {bird.fly === 1 ? 'Yes' : 'No'}
          </p>
          <p>
            <strong>Note:</strong> {bird.note}
          </p>
        </div>

        <div className="flex justify-center mt-6">
          <Link to={'/'}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BirdProfile
