import axiosInterceptorInstance from "@/utils/axios";
import { CONTACTS } from "@/utils/routes/apiRoutes";
import { getHeaderWithAuth } from "./headerObj";

/**
 * getPipelineContacts request
 * @param params
 * @returns
 */
export const getPipelineContacts = async (params) => {
  try {
    const response = await axiosInterceptorInstance.get(
      `${CONTACTS}/pipeline`,
      {
        params: {
          waba_meta_id: params.waba_meta_id,
        },
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("getPipelineContacts err", err);
  }
};
