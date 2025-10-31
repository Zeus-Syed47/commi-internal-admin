import axiosInterceptorInstance from "@/utils/axios";
import { getHeaderWithAuth } from "./headerObj";
import { VIRTUAL_PHONE_NUMBERS } from "@/utils/routes/apiRoutes";

// find virtual phone numbers
export const getVirtualPhoneNumbers = async (params) => {
  try {
    const response = await axiosInterceptorInstance.get(
      `${VIRTUAL_PHONE_NUMBERS}`,
      {
        params: {
          company_id: params?.company_id,
        },
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("getVirtualPhoneNumbers err", err);
  }
};

// create a virtual phone number
export const createVirtualPhoneNumberAPI = async (data) => {
  try {
    const response = await axiosInterceptorInstance.post(
      `${VIRTUAL_PHONE_NUMBERS}`,
      data,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? {};
  } catch (err) {
    console.log("createVirtualPhoneNumber err", err);
    throw err;
  }
};

// update a virtual phone number
export const updateVirtualPhoneNumberAPI = async (params) => {
  try {
    const response = await axiosInterceptorInstance.put(
      `${VIRTUAL_PHONE_NUMBERS}/${params?.id}`,
      params?.data,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? {};
  } catch (err) {
    console.log("updateVirtualPhoneNumber err", err);
    throw err;
  }
};

// delete a virtual phone number
export const deleteVirtualPhoneNumberAPI = async (id) => {
  try {
    const response = await axiosInterceptorInstance.delete(
      `${VIRTUAL_PHONE_NUMBERS}/${id}`,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? {};
  } catch (err) {
    console.log("deleteVirtualPhoneNumber err", err);
    throw err;
  }
};
