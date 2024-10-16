import Birds from './Birds'
import AddBird from './AddBird'

function App() {
  return (
    <div
      className="flex flex-col p-4 min-h-screen bg-cover bg-center items-center relative"
      style={{ backgroundImage: 'url(/images/bg.jpg)' }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent pointer-events-none"></div>

      <header className="mb-6 z-10">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-md tracking-wide animate-fade-in">
          My Bird Collection
        </h1>
        <p className="text-2xl text-gray-200 mt-2 font-light">
          Discover the beauty of birds
        </p>
      </header>

      <section className="w-full max-w-2xl z-10">
        <div>
          <AddBird />
        </div>
      </section>

      <section className="w-full max-w-7xl z-10">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Birds />
        </div>
      </section>
    </div>
  )
}

export default App
