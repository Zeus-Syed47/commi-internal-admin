import axiosInterceptorInstance from "@/utils/axios";
import { getHeaderWithAuth } from "./headerObj";
import { AI } from "@/utils/routes/apiRoutes";

export const getCorrectedTextApi = async (params) => {
  try {
    const response = await axiosInterceptorInstance.post(`${AI}`, params, {
      headers: {
        Authorization: getHeaderWithAuth(),
      },
    });
    return response?.data ?? [];
  } catch (err) {
    console.log("getCorrectedTextApi err", err);
  }
};
