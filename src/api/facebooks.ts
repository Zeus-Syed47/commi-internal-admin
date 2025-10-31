import axiosInterceptorInstance from "@/utils/axios";
import { FACEBOOKS } from "@/utils/routes/apiRoutes";
import { getHeaderWithAuth } from "./headerObj";

export const exchangePageForToken = async (params) => {
  try {
    const response = await axiosInterceptorInstance.post(
      `${FACEBOOKS}/exchange-token`,
      params,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("exchangePageForToken err", err);
  }
};

export const deleteFBLoginApi = async (params) => {
  try {
    const response = await axiosInterceptorInstance.delete(
      `${FACEBOOKS}/${params.fbId}`,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("deleteFBLoginApi err", err);
  }
};
