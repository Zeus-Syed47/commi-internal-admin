import {CLIENTS} from '@/utils/routes/apiRoutes'
import { getHeaderWithAuth } from "./headerObj";
import axiosInterceptorInstance from "@/utils/axios";


/**
 * getContacts request
 * @param params
 * @returns
 */
export const getClients = async (params) => {
  try {
    const response = await axiosInterceptorInstance.get(`${CLIENTS}`, {
      params,
      headers: {
        Authorization: getHeaderWithAuth(),
      },
    });
    return response?.data ?? [];
  } catch (err) {
    console.log("getClients err", err);
    throw err
  }
};