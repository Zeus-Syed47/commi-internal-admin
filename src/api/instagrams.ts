import axiosInterceptorInstance from "@/utils/axios";
import { INSTAGRAM } from "@/utils/routes/apiRoutes";
import { getHeaderWithAuth } from "./headerObj";

export const exchangeTokenForCode = async (params) => {
  try {
    const response = await axiosInterceptorInstance.post(
      `${INSTAGRAM}/exchange-token`,
      params,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("exchangeTokenForCode err", err);
  }
};

export const mockInstaLoginApi = async (params) => {
  try {
    const response = await axiosInterceptorInstance.post(
      `${INSTAGRAM}/mock`,
      params,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("mockInstaLoginApi err", err);
  }
};

export const deleteInstaLoginApi = async (params) => {
  try {
    const response = await axiosInterceptorInstance.delete(
      `${INSTAGRAM}/${params.instaId}`,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("deleteInstaLoginApi err", err);
  }
};
