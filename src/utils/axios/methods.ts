import axiosInterceptorInstance from ".";

/**
 * get method
 * @param url
 * @returns
 */
export const getRequest = async (url) => {
  try {
    const response = await axiosInterceptorInstance.get(url);
    return response?.data;
  } catch (err) {
    console.error("error", err);
  }
};

/**
 * post method
 * @param url
 * @param body
 * @returns
 */
export const postRequest = async (url, body) => {
  try {
    const response = await axiosInterceptorInstance.post(url, body);
    return response;
  } catch (err) {
    console.error("error", err);
  }
};

/**
 * patch method
 * @param url
 * @param body
 * @returns
 */
export const patchRequest = async (url, body) => {
  try {
    const response = await axiosInterceptorInstance.patch(url, body);
    return response;
  } catch (err) {
    console.error("error", err);
  }
};

/**
 * delete method
 * @param url
 * @param body
 * @returns
 */
export const deleteRequest = async (url) => {
  try {
    const response = await axiosInterceptorInstance.delete(url);
    return response;
  } catch (err) {
    console.error("error", err);
  }
};
