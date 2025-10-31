import { CALL } from "@/utils/routes/apiRoutes";
import { getHeaderWithAuth } from "./headerObj";
import axiosInterceptorInstance from "@/utils/axios";

/**
 * makeCallApi request via file
 * @param params
 * @returns
 */
export const makeCallApi = async (params) => {
  try {
    const response = await axiosInterceptorInstance.post(`${CALL}`, params, {
      headers: {
        Authorization: getHeaderWithAuth(),
      },
    });
    return response?.data ?? [];
  } catch (err) {
    console.log("makeCallApi err", err);
  }
};
