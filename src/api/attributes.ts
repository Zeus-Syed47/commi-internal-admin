import axiosInterceptorInstance from "@/utils/axios";
import { ATTRIBUTES } from "@/utils/routes/apiRoutes";
import { getHeaderWithAuth } from "./headerObj";

/**
 * getAttributes request
 * @param params
 * @returns
 */
export const getCompanyAttributes = async (params) => {
  try {
    const response = await axiosInterceptorInstance.get(
      `${ATTRIBUTES}/${params?.company_id}`,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("getCompanyAttributes err", err);
  }
};

/**
 * createAttribute request
 * @param params
 * @returns
 */
export const createAttribute = async (params) => {
  try {
    const response = await axiosInterceptorInstance.post(
      `${ATTRIBUTES}`,
      params,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("createAttribute err", err);
  }
};
