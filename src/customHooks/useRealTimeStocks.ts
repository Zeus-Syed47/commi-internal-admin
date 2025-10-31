import { getRealTimeStockDetails, getStocks } from '@/app/api/stocks'
import { useQuery } from '@tanstack/react-query'

export function useRealTimeStocks({ symbols, triggers }) {
  const query = useQuery({
    queryKey: ['realTimeStockPrices', triggers],
    queryFn: () => {
      return getRealTimeStockDetails(symbols)
    },
    enabled: true // modify for manual call
  })

  return query
}
