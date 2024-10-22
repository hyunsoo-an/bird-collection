import { useNavigate, useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useEditBirdProfile from '../hooks/useEditBirdProfile'
import { getBirdById } from '../apis/birdsApi'
import Bird from '../../models/bird'

export default function UpdateBirdProfile() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [formValues, setFormValues] = useState<Partial<Bird>>({
    name: '',
    type: '',
    color: '',
    size: '',
    habitat: '',
    fly: false,
    note: '',
    // image: null,
  })

  const editBirdProfile = useEditBirdProfile(Number(id))

  useEffect(() => {
    const fetchBirdData = async () => {
      try {
        const bird = await getBirdById(Number(id))
        setFormValues({
          name: bird.name,
          type: bird.type,
          color: bird.color,
          size: bird.size,
          habitat: bird.habitat,
          fly: bird.fly === 1,
          note: bird.note,
          // image: bird.image,
        })
      } catch (error) {
        console.error('Failed to fetch bird data:', error)
      }
    }

    fetchBirdData()
  }, [id])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    await editBirdProfile.mutateAsync(formValues)
    navigate(`/birds/${id}`)
  }

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: name === 'fly' ? value === '1' : value,
    }))
  }

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: 'url(/images/bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent pointer-events-none"></div>

      <div className="w-full max-w-xl p-6 bg-white shadow-md rounded-lg z-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Edit Bird Profile</h2>
          <Link
            to="/"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            View All Birds
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-semibold">
              Name:
            </label>
            <input
              className="w-full border-2 rounded-md p-2"
              type="text"
              id="name"
              name="name"
              value={formValues.name || ''}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="type" className="block font-semibold">
              Type:
            </label>
            <input
              className="w-full border-2 rounded-md p-2"
              type="text"
              id="type"
              name="type"
              value={formValues.type || ''}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="color" className="block font-semibold">
              Color:
            </label>
            <input
              className="w-full border-2 rounded-md p-2"
              type="text"
              id="color"
              name="color"
              value={formValues.color || ''}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="size" className="block font-semibold">
              Size:
            </label>
            <input
              className="w-full border-2 rounded-md p-2"
              type="text"
              id="size"
              name="size"
              value={formValues.size || ''}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="habitat" className="block font-semibold">
              Habitat:
            </label>
            <input
              className="w-full border-2 rounded-md p-2"
              type="text"
              id="habitat"
              name="habitat"
              value={formValues.habitat || ''}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="fly" className="block font-semibold">
              Fly:
            </label>
            <select
              id="fly"
              name="fly"
              value={formValues.fly ? 1 : 0}
              onChange={handleChange}
              className="w-full border-2 rounded-md p-2"
            >
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>
          </div>
          <div>
            <label htmlFor="note" className="block font-semibold">
              Note:
            </label>
            <textarea
              id="note"
              name="note"
              value={formValues.note || ''}
              onChange={handleChange}
              className="w-full border-2 rounded-md p-2"
            />
          </div>
          {/* <div>
            <label htmlFor="image" className="block font-semibold">
              Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleChange}
              accept="image/*"
              className="w-full border-2 rounded-md p-2"
            />
          </div> */}
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Update Bird
            </button>
            <Link to={`/birds/${id}`}>
              <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
