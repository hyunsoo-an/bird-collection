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
          fly: bird.fly === 1, // Boolean으로 변환
          note: bird.note,
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
      [name]: name === 'fly' ? event.target.value === '1' : value,
    }))
  }

  return (
    <>
      <div className="p-1">
        <div className="flex justify-end">
          <Link to={'/birds'} className="btn-blue px-3 py-2 rounded-md">
            View All Birds
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center text-center">
          <h2>Edit Bird Profile</h2>
          <form onSubmit={handleSubmit} className="form">
            <div>
              <label htmlFor="name">Name: </label>
              <input
                className="border-2 rounded-md"
                type="text"
                id="name"
                name="name"
                value={formValues.name || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="type">Type: </label>
              <input
                className="border-2 rounded-md"
                type="text"
                id="type"
                name="type"
                value={formValues.type || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="color">Color: </label>
              <input
                className="border-2 rounded-md"
                type="text"
                id="color"
                name="color"
                value={formValues.color || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="size">Size: </label>
              <input
                className="border-2 rounded-md"
                type="text"
                id="size"
                name="size"
                value={formValues.size || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="habitat">Habitat: </label>
              <input
                className="border-2 rounded-md"
                type="text"
                id="habitat"
                name="habitat"
                value={formValues.habitat || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="fly">Fly: </label>
              <select
                id="fly"
                name="fly"
                value={formValues.fly ? 1 : 0}
                onChange={handleChange}
                className="border-2 rounded-md"
              >
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
            </div>
            <div>
              <label htmlFor="note">Note: </label>
              <textarea
                id="note"
                name="note"
                value={formValues.note || ''}
                onChange={handleChange}
                className="border-2 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="btn-blue mt-3 px-3 py-2 rounded-md"
            >
              Update Bird
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
