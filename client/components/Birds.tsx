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
    return <p>Error...</p>
  }

  const birdEmojis = ['🦜', '🦅', '🐧', '🐦‍⬛', '🦉']

  return (
    <>
      <h1>Birds</h1>
      <div className="bird-grid">
        {data.map((bird) => {
          const randomEmoji =
            birdEmojis[Math.floor(Math.random() * birdEmojis.length)]
          return (
            <div key={bird.id} className="bird-item">
              <span className="bird-icon">{randomEmoji}</span>
              <Link to={`/birds/${bird.id}`}>
                <p>{bird.name}</p>
              </Link>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Birds
