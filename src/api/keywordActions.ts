import axiosInterceptorInstance from "@/utils/axios";
import { KEYWORD_ACTIONS } from "@/utils/routes/apiRoutes";
import { getHeaderWithAuth, prepareConditions } from "./headerObj";

/**
 * getKeywordActions request
 * @param params
 * @returns
 */
export const getKeywordActions = async (params) => {
  try {
    const response = await axiosInterceptorInstance.get(`${KEYWORD_ACTIONS}`, {
      params: prepareConditions(params),
      headers: {
        Authorization: getHeaderWithAuth(),
      },
    });
    return response?.data ?? [];
  } catch (err) {
    console.log("getKeywordActions err", err);
  }
};

export const createKeywordActions = async (params) => {
  try {
    const response = await axiosInterceptorInstance.post(
      `${KEYWORD_ACTIONS}`,
      params,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("createKeywordActions err", err);
  }
};

export const updateKeywordActions = async (body, id) => {
  try {
    const response = await axiosInterceptorInstance.put(
      `${KEYWORD_ACTIONS}/${id}`,
      body,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("updateKeywordActions err", err);
  }
};

export const deleteKeywordActions = async (id) => {
  try {
    const response = await axiosInterceptorInstance.delete(
      `${KEYWORD_ACTIONS}/${id}`,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("deleteKeywordActions err", err);
  }
};
