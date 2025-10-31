import axiosInterceptorInstance from "@/utils/axios";
import { TEMPLATES } from "@/utils/routes/apiRoutes";
import { getHeaderWithAuth, prepareConditions } from "./headerObj";

/**
 * getTemplatesFromMeta request
 * @param params
 * @returns
 */
export const getTemplatesFromMeta = async (params) => {
  try {
    const response = await axiosInterceptorInstance.get(`${TEMPLATES}/meta`, {
      params: prepareConditions(params),
      headers: {
        Authorization: getHeaderWithAuth(),
      },
    });
    return response?.data ?? [];
  } catch (err) {
    console.log("getTemplatesFromMeta err", err);
  }
};

/**
 * getTemplates request
 * @param params
 * @returns
 */
export const getTemplates = async (params) => {
  try {
    const response = await axiosInterceptorInstance.get(`${TEMPLATES}`, {
      params: prepareConditions(params),
      headers: {
        Authorization: getHeaderWithAuth(),
      },
    });
    return response?.data ?? [];
  } catch (err) {
    console.log("getTemplates err", err);
  }
};

export const createTemplate = async (params) => {
  try {
    const response = await axiosInterceptorInstance.post(
      `${TEMPLATES}`,
      params,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("createTemplate err", err);
  }
};

export const deleteTemplate = async (params) => {
  try {
    const response = await axiosInterceptorInstance.post(
      `${TEMPLATES}/delete`,
      params,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("deleteTemplate err", err);
  }
};

export const createUploadSession = async (params) => {
  try {
    const response = await axiosInterceptorInstance.post(
      `${TEMPLATES}/upload-session`,
      params,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("createUploadSession err", err);
  }
};

export const initiateUpload = async (params) => {
  try {
    const response = await axiosInterceptorInstance.post(
      `${TEMPLATES}/initiate-upload`,
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
    console.log("initiateUpload err", err);
  }
};
