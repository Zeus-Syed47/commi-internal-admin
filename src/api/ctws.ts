import axiosInterceptorInstance from "@/utils/axios";
import { CTW } from "@/utils/routes/apiRoutes";
import { getHeaderWithAuth, prepareConditions } from "./headerObj";

/**
 * getCompanyCtws request
 * @param params
 * @returns
 */
export const getCompanyCtws = async (params) => {
  try {
    const response = await axiosInterceptorInstance.get(
      `${CTW}/${params?.company_id}`,
      {
        params: prepareConditions(params),
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("getCompanyCtws err", err);
  }
};

/**
 * createCtw request
 * @param params
 * @returns
 */
export const createCtw = async (params) => {
  try {
    const response = await axiosInterceptorInstance.post(`${CTW}`, params, {
      headers: {
        Authorization: getHeaderWithAuth(),
      },
    });
    return response?.data ?? [];
  } catch (err) {
    console.log("createCtw err", err);
  }
};

/**
 * updateCtw request
 * @param params
 * @returns
 */
export const updateCtw = async (params) => {
  try {
    const response = await axiosInterceptorInstance.put(
      `${CTW}/${params?.ctw_id}`,
      params.data,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("updateCtw err", err);
  }
};
