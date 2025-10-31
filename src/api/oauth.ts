import axiosInterceptorInstance from "@/utils/axios";
import { OAUTH } from "@/utils/routes/apiRoutes";

/**
 * google login request
 * @param params
 * @returns
 */
export const googleLoginApi = async (params) => {
  try {
    const response = await axiosInterceptorInstance.post(
      `${OAUTH}/google`,
      params
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("googleLoginApi err", err);
  }
};

/**
 * apple login request
 * @param params
 * @returns
 */
export const appleLoginApi = async (params) => {
  try {
    const response = await axiosInterceptorInstance.post(
      `${OAUTH}/apple`,
      params
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("appleLoginApi err", err);
  }
};
