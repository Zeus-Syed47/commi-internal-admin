import axiosInterceptorInstance from "@/utils/axios";
import { getHeaderWithAuth } from "./headerObj";
import { DATASOURCES } from "@/utils/routes/apiRoutes";

// find wabas
export const getDatasources = async (params) => {
  try {
    const response = await axiosInterceptorInstance.get(`${DATASOURCES}`, {
      params: {
        company_id: params?.company_id,
      },
      headers: {
        Authorization: getHeaderWithAuth(),
      },
    });
    return response?.data ?? [];
  } catch (err) {
    console.log("getDatasources err", err);
  }
};

export const importDatasources = async (params) => {
  try {
    const response = await axiosInterceptorInstance.post(
      `${DATASOURCES}`,
      params,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("importDatasources err", err);
  }
};
