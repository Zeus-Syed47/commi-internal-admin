import axiosInterceptorInstance from "@/utils/axios";
import { FLOWS } from "@/utils/routes/apiRoutes";
import { getHeaderWithAuth, prepareConditions } from "./headerObj";

/**
 * getTemplates request
 * @param params
 * @returns
 */
export const getFlows = async (params) => {
  try {
    const response = await axiosInterceptorInstance.get(`${FLOWS}`, {
      params: prepareConditions(params),
      headers: {
        Authorization: getHeaderWithAuth(),
      },
    });
    return response?.data ?? [];
  } catch (err) {
    console.log("getFlows err", err);
  }
};

export const createFlow = async (params) => {
  try {
    const response = await axiosInterceptorInstance.post(`${FLOWS}`, params, {
      headers: {
        Authorization: getHeaderWithAuth(),
      },
    });
    return response?.data ?? [];
  } catch (err) {
    console.log("createFlow err", err);
  }
};

export const updateFlow = async (body, id) => {
  try {
    const response = await axiosInterceptorInstance.put(
      `${FLOWS}/${id}`,
      body,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("updateFlow err", err);
  }
};

export const deleteFlow = async (id) => {
  try {
    const response = await axiosInterceptorInstance.delete(`${FLOWS}/${id}`, {
      headers: {
        Authorization: getHeaderWithAuth(),
      },
    });
    return response?.data ?? [];
  } catch (err) {
    console.log("deleteFlow err", err);
  }
};
