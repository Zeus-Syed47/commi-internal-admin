import { getPortfoRebalances } from '@/app/api/portfos'
import { useQuery } from '@tanstack/react-query'

export function usePortfoRebalances({ portfoId, hold }) {
  const query = useQuery({
    queryKey: ['portfoRebalances'],
    queryFn: () => {
      return getPortfoRebalances(portfoId)
    },
    enabled: !hold
  })

  return query
}
