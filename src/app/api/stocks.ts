import { GET_STOCKS } from '@/utils/routes/apiRoutes'
import { getRequest } from './../../utils/axios/methods'

/**
 * get stocks from user search
 * @param search_query
 * @returns
 */
export const getStocks = async ({ search_query }) => {
  try {
    const response = await getRequest(`${GET_STOCKS}?search_query=${search_query}`)
    return response?.data ?? []
  } catch (err) {
    console.log('getStocks err', err)
  }
}

/**
 * get real time stock details
 * @param symbols
 * @returns
 */
export const getRealTimeStockDetails = async symbols => {
  try {
    const response = await getRequest(`${GET_STOCKS}/quotes?symbols=${symbols}`)
    return response?.data ?? []
  } catch (err) {
    console.log('getRealTimeStockDetails err', err)
  }
}
