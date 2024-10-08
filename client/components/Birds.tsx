import { useQuery } from '@tanstack/react-query'
import { getBirds } from '../apis/birdsApi'
import { Link } from 'react-router-dom'

function Birds() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['getBirds'],
    queryFn: getBirds,
  })

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    console.error(error.message)
    return <p>Error: {error.message}</p>
  }

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">All Birds</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((bird) => (
          <div
            key={bird.id}
            className="border border-gray-300 rounded-lg overflow-hidden shadow-md"
          >
            <Link to={`/birds/${bird.id}`}>
              <img
                src={'/images/bird-profile.avif'}
                alt={`Profile of ${bird.name}`}
                className="w-full h-40 object-cover"
              />
              <p className="p-4 text-center font-medium">{bird.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default Birds
