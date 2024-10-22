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

  const birds = data || []
  const emptySlots = (5 - (birds.length % 5)) % 5

  const handleEmptySlotClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    })
  }

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">All Birds</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {data.map((bird) => (
          <div
            key={bird.id}
            className="border border-gray-300 rounded-lg overflow-hidden shadow-md"
          >
            <Link to={`/birds/${bird.id}`}>
              <img
                src={bird.image || '/images/bird-profile.jpg'}
                alt={`Profile of ${bird.name}`}
                className="w-full h-40 object-cover"
              />
              <p className="p-4 text-center font-medium">{bird.name}</p>
            </Link>
          </div>
        ))}
        {Array.from({ length: emptySlots }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className="bg-gray-300 h-50 w-full border border-gray-300 rounded-lg flex justify-center items-center cursor-pointer"
            onClick={handleEmptySlotClick}
          >
            <p className="text-gray-600">Add a Bird</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Birds
