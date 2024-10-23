import { useMutation, useQueryClient } from '@tanstack/react-query'
import Bird from '../../models/bird.ts'
import { ChangeEvent, FormEvent, useState } from 'react'
import { addBird } from '../apis/birdsApi.ts'

function AddBird() {
  const [
    { name, type, color, size, habitat, note, fly, image },
    setFormValues,
  ] = useState({
    name: '',
    type: '',
    color: '',
    size: '',
    habitat: '',
    note: '',
    fly: false,
    image: null,
  })

  const queryClient = useQueryClient()

  const addMutation = useMutation({
    mutationFn: async (bird: Bird) => addBird(bird),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['getBirds'] })
    },
  })

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = evt.currentTarget
    setFormValues((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : files ? files[0] : value,
    }))
  }

  const onSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    const formData = new FormData()
    formData.append('name', name)
    formData.append('type', type)
    formData.append('color', color)
    formData.append('size', size)
    formData.append('habitat', habitat)
    formData.append('note', note)
    formData.append('fly', fly.toString())
    if (image) {
      formData.append('image', image)
    }

    await addMutation.mutate({
      name,
      type,
      color,
      size,
      habitat,
      note,
      fly,
      image: image ? URL.createObjectURL(image) : null,
    })

    setFormValues({
      name: '',
      type: '',
      color: '',
      size: '',
      habitat: '',
      note: '',
      fly: false,
      image: null,
    })
  }

  return (
    <form
      className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 "
      onSubmit={onSubmit}
    >
      <h2 className="text-2xl font-semibold mb-4">Add a New Bird</h2>
      <div className="mb-4">
        <label htmlFor="birdName" className="block text-sm font-medium mb-1">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={onChange}
          className="border border-gray-300 rounded w-full py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="type" className="block text-sm font-medium mb-1">
          Type
        </label>
        <input
          type="text"
          name="type"
          id="type"
          value={type}
          onChange={onChange}
          className="border border-gray-300 rounded w-full py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="color" className="block text-sm font-medium mb-1">
          Color
        </label>
        <input
          type="text"
          name="color"
          id="color"
          value={color}
          onChange={onChange}
          className="border border-gray-300 rounded w-full py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="size" className="block text-sm font-medium mb-1">
          Size
        </label>
        <input
          type="text"
          name="size"
          id="size"
          value={size}
          onChange={onChange}
          className="border border-gray-300 rounded w-full py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="habitat" className="block text-sm font-medium mb-1">
          Habitat
        </label>
        <input
          type="text"
          name="habitat"
          id="habitat"
          value={habitat}
          onChange={onChange}
          className="border border-gray-300 rounded w-full py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="note" className="block text-sm font-medium mb-1">
          Note
        </label>
        <input
          type="text"
          name="note"
          id="note"
          value={note}
          onChange={onChange}
          className="border border-gray-300 rounded w-full py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="fly" className="block text-sm font-medium mb-1">
          Fly
        </label>
        <input
          type="checkbox"
          name="fly"
          id="fly"
          checked={fly}
          onChange={onChange}
          className="mr-2 h-5 w-5"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block text-sm font-medium mb-1">
          Image
        </label>
        <input
          type="file"
          name="image"
          id="image"
          onChange={onChange}
          accept="image/*"
          className="border border-gray-300 rounded w-full py-2 px-3"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Create
      </button>
    </form>
  )
}

export default AddBird
