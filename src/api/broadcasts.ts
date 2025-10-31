import axiosInterceptorInstance from "@/utils/axios";
import { BROADCASTS, MESSAGES } from "@/utils/routes/apiRoutes";
import { getHeaderWithAuth, prepareConditions } from "./headerObj";

/**
 * getBroadcasts request
 * @param params
 * @returns
 */
export const getBroadcasts = async (params) => {
  try {
    const response = await axiosInterceptorInstance.get(`${BROADCASTS}`, {
      params: prepareConditions(params),
      headers: {
        Authorization: getHeaderWithAuth(),
      },
    });
    return response?.data ?? [];
  } catch (err) {
    console.log("getBroadcasts err", err);
  }
};

/**
 * getBroadcast request
 * @param params
 * @returns
 */
export const getBroadcast = async (params) => {
  try {
    const response = await axiosInterceptorInstance.get(
      `${BROADCASTS}/${params?.broadcast_id}`,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("getBroadcast err", err);
  }
};

/**
 * getScheduledBroadcasts request
 * @param params
 * @returns
 */
export const getScheduledBroadcasts = async (params) => {
  try {
    const response = await axiosInterceptorInstance.get(
      `${BROADCASTS}/scheduled`,
      {
        params: prepareConditions(params),
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("getScheduledBroadcasts err", err);
  }
};

/**
 * sendBroadCast request
 * @param params
 * @returns
 */
export const sendBroadcast = async (params) => {
  try {
    const response = await axiosInterceptorInstance.post(
      `${BROADCASTS}/send`,
      params,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("sendBroadCast err", err);
  }
};

/**
 * sendBroadcastViaFile request via file
 * @param params
 * @returns
 */
export const sendBroadcastViaFile = async (params) => {
  try {
    const response = await axiosInterceptorInstance.post(
      `${BROADCASTS}/file/send`,
      params,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("sendBroadcastViaFile err", err);
  }
};

/**
 * sendBroadcastViaFilter request
 * @param params
 * @returns
 */
export const sendBroadcastViaFilter = async (params) => {
  try {
    const response = await axiosInterceptorInstance.post(
      `${BROADCASTS}/send/filter`,
      params,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("sendBroadcastViaFilter err", err);
  }
};

/**
 * retryBroadcastApi request
 * @param params
 * @returns
 */
export const retryBroadcastApi = async (params) => {
  try {
    const response = await axiosInterceptorInstance.post(
      `${BROADCASTS}/retry`,
      params,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("retryBroadcastApi err", err);
  }
};
