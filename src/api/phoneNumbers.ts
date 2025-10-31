import axiosInterceptorInstance from "@/utils/axios";
import { getHeaderWithAuth } from "./headerObj";
import { PHONE_NUMBERS } from "@/utils/routes/apiRoutes";

// find phone numbers
export const getPhoneNumbers = async (params) => {
  try {
    const response = await axiosInterceptorInstance.get(`${PHONE_NUMBERS}`, {
      params: {
        waba_id: params?.waba_id,
        waba_meta_id: params?.waba_meta_id,
      },
      headers: {
        Authorization: getHeaderWithAuth(),
      },
    });
    return response?.data ?? [];
  } catch (err) {
    console.log("getPhoneNumbers err", err);
  }
};
