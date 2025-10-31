import axiosInterceptorInstance from "@/utils/axios";
import { getHeaderWithAuth } from "./headerObj";
import { COMPANIES } from "@/utils/routes/apiRoutes";

/**
 * getCompany request
 * @param params
 * @returns
 */
export const getCompany = async (params) => {
  try {
    const response = await axiosInterceptorInstance.get(
      `${COMPANIES}/${params?.company_id}`,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("getCompany err", err);
  }
};

/**
 * update a updateCompany request
 * @param params
 * @returns
 */
export const updateCompany = async (params) => {
  try {
    const response = await axiosInterceptorInstance.put(
      `${COMPANIES}/${params?.company_id}`,
      params?.data,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("updateCompany err", err);
  }
};
