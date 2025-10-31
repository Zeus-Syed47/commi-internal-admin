import { getSegmentItemsOfAPortfos } from '@/app/api/segmentItems'
import { useQuery } from '@tanstack/react-query'

export function usePortfoSegments({ portfoId, hold }) {
  const query = useQuery({
    queryKey: ['portfoSegments'],
    queryFn: () => {
      return getSegmentItemsOfAPortfos(portfoId)
    },
    enabled: !hold
  })

  return query
}
