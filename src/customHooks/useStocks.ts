import { getStocks } from '@/app/api/stocks'
import { useQuery } from '@tanstack/react-query'

export function useStocks({ search_query }) {
  const query = useQuery({
    queryKey: ['stocks'],
    queryFn: () => {
      return getStocks({ search_query })
    },
    enabled: false // for manual call
  })

  return query
}
