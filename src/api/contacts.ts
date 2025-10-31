import axiosInterceptorInstance from "@/utils/axios";
import { getRequest, postRequest } from "@/utils/axios/methods";
import {
  CONTACT_ATTRIBUTES,
  CONTACTS,
  IMPORT_CONTACTS,
  SYNC_CONTACTS,
} from "@/utils/routes/apiRoutes";
import { getHeaderWithAuth, prepareConditions } from "./headerObj";

/**
 * importContact request
 * @param params
 * @returns
 */
export const importContacts = async (params) => {
  try {
    const response = await axiosInterceptorInstance.post(
      `${IMPORT_CONTACTS}`,
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
    console.log("importContacts err", err);
  }
};

/**
 * sync contact request
 * @param params
 * @returns
 */
export const syncContacts = async (params) => {
  try {
    const response = await axiosInterceptorInstance.post(
      `${SYNC_CONTACTS}`,
      params,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("syncContacts err", err);
  }
};

/**
 * getContacts request
 * @param params
 * @returns
 */
export const getContact = async (params) => {
  try {
    const response = await axiosInterceptorInstance.get(
      `${CONTACTS}/${params?.contact_id}`,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("getContact err", err);
  }
};

/**
 * getContactAttributes request
 * @param params
 * @returns
 */
export const getContactAttributes = async (params) => {
  try {
    const response = await axiosInterceptorInstance.get(
      `${CONTACT_ATTRIBUTES}/${params?.contact_id}`,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("getContactAttributes err", err);
  }
};

/**
 * getContacts request
 * @param params
 * @returns
 */
export const getContacts = async (params) => {
  try {
    const response = await axiosInterceptorInstance.get(`${CONTACTS}`, {
      params: prepareConditions(params),
      headers: {
        Authorization: getHeaderWithAuth(),
      },
    });
    return response?.data ?? [];
  } catch (err) {
    console.log("getContacts err", err);
  }
};

/**
 * createContacts request
 * @param params
 * @returns
 */
export const createContact = async (params) => {
  try {
    const response = await axiosInterceptorInstance.post(
      `${CONTACTS}`,
      params,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("createContact err", err);
  }
};

/**
 * updateContact request
 * @param params
 * @returns
 */
export const updateContact = async (params) => {
  try {
    const response = await axiosInterceptorInstance.put(
      `${CONTACTS}/${params?.contact_id}`,
      params.data,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("updateContact err", err);
  }
};

/**
 * updateContactAttribute request
 * @param params
 * @returns
 */
export const updateContactAttribute = async (params) => {
  try {
    const response = await axiosInterceptorInstance.put(
      `${CONTACT_ATTRIBUTES}`,
      params.data,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("updateContactAttribute err", err);
  }
};

/**
 * deleteContact request
 * @param params
 * @returns
 */
export const deleteContact = async (params) => {
  try {
    const response = await axiosInterceptorInstance.delete(
      `${CONTACTS}/${params?.contact_id}`,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("deleteContact err", err);
  }
};
