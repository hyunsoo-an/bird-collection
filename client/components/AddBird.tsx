import { useMutation, useQueryClient } from '@tanstack/react-query'
import Bird from '../../models/bird.ts'
import { ChangeEvent, FormEvent, useState } from 'react'
import { addBird } from '../apis/birdsApi.ts'

function AddBird() {
  const [{ birdName, type, color, size, habitat }, setFormValues] = useState({
    birdName: '',
    type: '',
    color: '',
    size: '',
    habitat: '',
  })

  const queryClient = useQueryClient()

  const addMutation = useMutation({
    mutationFn: async (bird: Bird) => addBird(bird),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['getBirds'] })
    },
  })

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.currentTarget
    setFormValues((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const onSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    await addMutation.mutate({
      name: birdName,
      type,
      color,
      size,
      habitat,
    })
  }

  return (
    <>
      <form className="form" onSubmit={onSubmit} aria-label="Create bird">
        <div>
          <label htmlFor="birdName">Name</label>
          <input
            className="form__input"
            type="text"
            name="birdName"
            id="birdName"
            value={birdName}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="type">Type</label>
          <input
            type="text"
            name="type"
            id="type"
            value={type}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="color">Color</label>
          <input
            type="text"
            name="color"
            id="color"
            value={color}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="size">Size</label>
          <input
            type="text"
            name="size"
            id="size"
            value={size}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="habitat">Habitat</label>
          <input
            type="text"
            name="habitat"
            id="habitat"
            value={habitat}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="button-primary">
          create
        </button>
      </form>
    </>
  )
}
export default AddBird
