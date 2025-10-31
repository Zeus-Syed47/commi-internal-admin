import axiosInterceptorInstance from "@/utils/axios";
import { MESSAGES } from "@/utils/routes/apiRoutes";
import { getHeaderWithAuth } from "./headerObj";

/**
 * getMessages request
 * @param params
 * @returns
 */
export const getMessages = async (params) => {
  try {
    const response = await axiosInterceptorInstance.get(`${MESSAGES}`, {
      headers: {
        Authorization: getHeaderWithAuth(),
      },
    });
    return response?.data ?? [];
  } catch (err) {
    console.log("getFlows err", err);
  }
};

/**
 * sendMessage request
 * @param params
 * @returns
 */
export const sendMessage = async (params) => {
  try {
    const response = await axiosInterceptorInstance.post(
      `${MESSAGES}/send`,
      params,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("sendMessage err", err);
  }
};

/**
 * sendInternalMessage request
 * @param params
 * @returns
 */
export const sendInternalMessage = async (params) => {
  try {
    const response = await axiosInterceptorInstance.post(
      `${MESSAGES}/send/internal`,
      params,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("sendInternalMessage err", err);
  }
};

/**
 * getBroadcastMessages request
 * @param params
 * @returns
 */
export const getBroadcastMessages = async (params) => {
  try {
    const response = await axiosInterceptorInstance.get(
      `${MESSAGES}/broadcast`,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
        params: params,
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("getBroadcastMessages err", err);
  }
};

/**
 * getBroadcastAnalyticsMessages request
 * @param params
 * @returns
 */
export const getBroadcastAnalyticsMessages = async (params) => {
  try {
    const response = await axiosInterceptorInstance.get(
      `${MESSAGES}/broadcast/analytics`,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
        params: params,
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("getBroadcastAnalyticsMessages err", err);
  }
};

export const updateMessage = async (params) => {
  try {
    const response = await axiosInterceptorInstance.put(
      `${MESSAGES}`,
      params?.data,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("updateMessage err", err);
  }
};
