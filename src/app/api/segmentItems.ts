import { ADD_SEGMENT_ITEMS, GET_PORTFOS, GET_PORTFO_SEGMENTS, UPDATE_SEGMENT_ITEMS } from '@/utils/routes/apiRoutes'
import { deleteRequest, getRequest, patchRequest, postRequest } from './../../utils/axios/methods'

/**
 * get Segment Items Of A Portfos
 * @param portfoId
 * @returns
 */
export const getSegmentItemsOfAPortfos = async portfoId => {
  try {
    const response = await getRequest(`${GET_PORTFOS}/${portfoId}/${GET_PORTFO_SEGMENTS}`)
    return response?.data ?? []
  } catch (err) {
    console.log('getPortfos err', err)
  }
}

/**
 * add segment items to a segment
 * @param body
 * @returns
 */
export const addSegmentItemsToSegment = async body => {
  try {
    const response = await postRequest(ADD_SEGMENT_ITEMS, body)
    return response?.data ?? []
  } catch (err) {
    console.log('addSegmentItemsToSegment err', err)
  }
}

/**
 * update Segment Items
 * @param body
 * @returns
 */
export const updateSegmentItems = async ({ segment_item_id, body }) => {
  try {
    const response = await patchRequest(UPDATE_SEGMENT_ITEMS(segment_item_id), body)
    return response?.data ?? []
  } catch (err) {
    console.log('addSegmentItemsToSegment err', err)
  }
}

/**
 * delete segment item
 * @param param0
 * @returns
 */
export const deleteSegmentItems = async ({ segment_item_id }) => {
  try {
    const response = await deleteRequest(UPDATE_SEGMENT_ITEMS(segment_item_id))
    return response?.data ?? []
  } catch (err) {
    console.log('deleteSegmentItems err', err)
  }
}
