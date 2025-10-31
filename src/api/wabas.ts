import axiosInterceptorInstance from "@/utils/axios";
import { getHeaderWithAuth } from "./headerObj";
import { WABA } from "@/utils/routes/apiRoutes";

// find wabas
export const getWabas = async (params) => {
  try {
    const response = await axiosInterceptorInstance.get(`${WABA}`, {
      params: {
        waba_id: params?.waba_id,
      },
      headers: {
        Authorization: getHeaderWithAuth(),
      },
    });
    return response?.data ?? [];
  } catch (err) {
    console.log("getWabas err", err);
  }
};
