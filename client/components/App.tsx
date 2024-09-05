import Birds from './Birds'
import AddBird from './AddBird'

function App() {
  return (
    <>
      <header className="header">
        <h1>My Collection</h1>
      </header>
      <section className="main">
        <Birds />
        <AddBird />
      </section>
    </>
  )
}

export default App
