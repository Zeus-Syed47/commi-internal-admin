import axiosInterceptorInstance from "@/utils/axios";
import { getRequest, postRequest } from "@/utils/axios/methods";
import {
  CONTACTS,
  CONVERSATIONS,
  IMPORT_CONTACTS,
} from "@/utils/routes/apiRoutes";
import { getHeaderWithAuth } from "./headerObj";

/**
 * getConversation request
 * @param params
 * @returns
 */
export const getConversation = async (params) => {
  try {
    const response = await axiosInterceptorInstance.get(
      `${CONVERSATIONS}/${params?.conversation_id}`,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("getConversations err", err);
  }
};

/**
 * getConversations request
 * @param params
 * @returns
 */
export const getConversations = async (params) => {
  try {
    let convoParams: any = {
      contact_id: params.contact_id,
    };
    if (params.limit) {
      convoParams.limit = params.limit;
    }
    if (params.offset) {
      convoParams.offset = params.offset;
    }
    if (params.waba_id) {
      convoParams.waba_id = params.waba_id;
    }
    if (params.commi_insta_user_id) {
      convoParams.commi_insta_user_id = params.commi_insta_user_id;
    }
    if (params.commi_fb_page_id) {
      convoParams.commi_fb_page_id = params.commi_fb_page_id;
    }
    const response = await axiosInterceptorInstance.get(`${CONVERSATIONS}`, {
      params: convoParams,
      headers: {
        Authorization: getHeaderWithAuth(),
      },
    });
    return response?.data ?? [];
  } catch (err) {
    console.log("getConversations err", err);
  }
};

export const createConversations = async (params) => {
  try {
    const response = await axiosInterceptorInstance.post(
      `${CONVERSATIONS}`,
      params,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("getTemplates err", err);
  }
};

export const updateConversation = async (params) => {
  try {
    const response = await axiosInterceptorInstance.put(
      `${CONVERSATIONS}/${params?.conversation_id}`,
      params?.data,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("updateConversation err", err);
  }
};
