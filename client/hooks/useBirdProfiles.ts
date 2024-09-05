import { useQuery } from '@tanstack/react-query'
import Bird from '../../models/bird'

export function useBirdProfile(id: number) {
  return useQuery({
    queryKey: ['bird', id],
    queryFn: () => getBirdById(id),
  })
}
const getBirdById = async (id: number): Promise<Bird> => {
  const response = await fetch(`/api/v1/birds/${id}`)
  return response.json()
}
