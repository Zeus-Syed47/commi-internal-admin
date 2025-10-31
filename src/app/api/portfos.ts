import { ADD_SEGMENT_ITEMS, GET_PORTFO, GET_PORTFOS, REBALANCE } from '@/utils/routes/apiRoutes'
import { getRequest, postRequest } from './../../utils/axios/methods'

export const getPortfos = async () => {
  try {
    const response = await getRequest(GET_PORTFOS)
    return response?.data ?? []
  } catch (err) {
    console.log('getPortfos err', err)
  }
}

export const getPortfo = async portfoId => {
  try {
    const response = await getRequest(`${GET_PORTFO}/${portfoId}`)
    return response?.data ?? []
  } catch (err) {
    console.log('getPortfo err', err)
  }
}

/**
 * Create portfo
 * @param body
 * @returns
 */
export const createPortfo = async body => {
  try {
    const response = await postRequest(GET_PORTFOS, body)
    return response?.data ?? []
  } catch (err) {
    console.log('Create portfo err', err)
  }
}

/**
 * Create portfo rebalance
 * @param body
 * @returns
 */
export const createPortfoRebalance = async body => {
  try {
    const response = await postRequest(`${GET_PORTFOS}${REBALANCE}`, body.params)
    return response?.data ?? []
  } catch (err) {
    console.log('Create portfo rebalance err', err)
  }
}

/**
 * get portfo rebalances
 * @param portfoId
 * @returns
 */
export const getPortfoRebalances = async portfoId => {
  try {
    const response = await getRequest(`${GET_PORTFOS}/${portfoId}${REBALANCE}`)
    return response?.data ?? []
  } catch (err) {
    console.log('getPortfoRebalance err', err)
  }
}
