import axiosInterceptorInstance from "@/utils/axios";
import { USERS } from "@/utils/routes/apiRoutes";
import { getHeaderWithAuth } from "./headerObj";

export const isValidAuthToken = async (params) => {
  try {
    const response = await axiosInterceptorInstance.get(
      `${USERS}/login/isValid`
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("isValidAuthToken err", err);
  }
};

// user login
export const userLogin = async (params) => {
  try {
    const response = await axiosInterceptorInstance.post(
      `${USERS}/login`,
      params
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("userLogin err", err);
  }
};

// user signup
export const userSignUp = async (params) => {
  try {
    const response = await axiosInterceptorInstance.post(
      `${USERS}/signup`,
      params
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("userSignUp err", err);
  }
};

// find user
export const findUser = async (params) => {
  try {
    const response = await axiosInterceptorInstance.get(
      `${USERS}/${params?.user_id}`,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("findUser err", err);
  }
};

// find user of a company
export const findUserOfCompany = async (params) => {
  try {
    const response = await axiosInterceptorInstance.get(
      `${USERS}/company/user/${params?.user_id}`,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("findUserOfCompany err", err);
  }
};

// find user
export const findUsersOfCompany = async (params) => {
  try {
    const response = await axiosInterceptorInstance.get(
      `${USERS}/company/${params?.company_id}`,
      {
        params: { forAI: params?.forAI ?? false },
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("findUsersOfCompany err", err);
  }
};

/**
 * add a user request
 * @param params
 * @returns
 */
export const addUserToACompany = async (params) => {
  try {
    const response = await axiosInterceptorInstance.post(
      `${USERS}/add`,
      params,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("addUser err", err);
  }
};

/**
 * update a user request
 * @param params
 * @returns
 */
export const updateUserOfACompany = async (params) => {
  try {
    const response = await axiosInterceptorInstance.put(
      `${USERS}/${params?.user_id}`,
      params?.data,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("updateUserOfACompany err", err);
  }
};

/**
 * remove a user request
 * @param params
 * @returns
 */
export const removeUserFromACompany = async (params) => {
  try {
    const response = await axiosInterceptorInstance.post(
      `${USERS}/remove`,
      params,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("removeUserFromACompany err", err);
  }
};

/**
 * Reset a user's password
 * @param params - An object containing the token and  password
 * @returns The response data from the server
 */
export const resetPasswordAPI = async (params: {
  password: string;
  token: string;
}) => {
  try {
    const response = await axiosInterceptorInstance.post(
      `${USERS}/reset-password`, // Replace with the correct API endpoint for resetting the password
      params,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("resetPassword err", err);
    throw err; // Optionally rethrow the error if you want to handle it elsewhere
  }
};

/**
 * Send a forgot password request
 * @param params - An object containing the email
 * @returns The response data from the server
 */
export const forgotPasswordAPI = async (params: { email: string }) => {
  try {
    const response = await axiosInterceptorInstance.post(
      `${USERS}/forgot-password`, // Replace with your actual forgot-password endpoint
      params,
      {
        headers: {
          Authorization: getHeaderWithAuth(), // Include this only if your API requires auth
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("forgotPassword err", err);
    throw err;
  }
};

export const userLogOut = async (params) => {
  try {
    const response = await axiosInterceptorInstance.post(
      `${USERS}/logout`,
      params,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("userLogin err", err);
  }
};
