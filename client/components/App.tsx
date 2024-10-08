import Birds from './Birds'
import AddBird from './AddBird'

function App() {
  return (
    <div
      className="flex flex-col items-center p-4 bg-cover bg-center"
      style={{ backgroundImage: 'url(/images/bg.jpg)' }}
    >
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-black-600">
          My Bird Collection
        </h1>
      </header>
      <section className="w-full max-w-2xl ">
        <div>
          <AddBird />
        </div>
      </section>
      <section className="w-full max-w-2xl">
        <div className="bg-blue-100 p-6 rounded-lg shadow-md">
          <Birds />
        </div>
      </section>
    </div>
  )
}

export default App
