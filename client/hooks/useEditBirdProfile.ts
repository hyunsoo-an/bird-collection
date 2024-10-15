import { useMutation, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
import Bird from '../../models/bird'

export default function useEditBirdProfile(id: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (updates: Partial<Bird>) => {
      await request.patch(`/api/v1/birds/${id}`).send(updates)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['bird', id] })
    },
  })
}
