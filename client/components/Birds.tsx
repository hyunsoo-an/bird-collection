import { useQuery } from '@tanstack/react-query'
import { getBirds } from '../apis/birdsApi'
import AddBird from './AddBird'

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

  const birdEmojis = ['🦜', '🦅', '🐧', '🐦‍⬛', '🦉']

  console.log('Birds Component', data)

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
              <p>{bird.name}</p>
            </div>
          )
        })}
      </div>
      <AddBird />
    </>
  )
}

export default Birds
