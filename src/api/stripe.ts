import axiosInterceptorInstance from "@/utils/axios";
import { ATTRIBUTES, STRIPE } from "@/utils/routes/apiRoutes";
import { getHeaderWithAuth } from "./headerObj";

/**
 * createStripeSession request
 * @param params
 * @returns
 */
export const createStripeSession = async (params) => {
  try {
    const response = await axiosInterceptorInstance.post(
      `${STRIPE}/checkout`,
      params,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("createStripeSession err", err);
  }
};
