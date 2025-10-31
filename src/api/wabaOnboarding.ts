import axiosInterceptorInstance from "@/utils/axios";
import { ONBOARDING } from "@/utils/routes/apiRoutes";
import { getHeaderWithAuth } from "./headerObj";

export const exchangeWABAForToken = async (params) => {
  try {
    const response = await axiosInterceptorInstance.post(
      `${ONBOARDING}/exchange-token`,
      params,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("exchangeWABAForToken err", err);
  }
};

export const registerPhoneApi = async (params) => {
  try {
    const response = await axiosInterceptorInstance.post(
      `${ONBOARDING}/register-phone`,
      params,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("registerPhoneApi err", err);
  }
};
