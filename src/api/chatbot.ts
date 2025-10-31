import axiosInterceptorInstance from "@/utils/axios";
import { AI } from "@/utils/routes/apiRoutes";
import { getHeaderWithAuth, prepareConditions } from "./headerObj";


type GetChatbotFilesParams = {
  limit?: number;
  offset?: number;
  search?: string;
  searchKey?: string;
  filter?: Record<string, any>; 
  fields?: string[];
  commi_insta_user_id?: string;
  commi_fb_page_id?: string;
  waba_meta_id?: string;
  business_phone_id?: string;
  waba_id?: string;
  phone_number_id?: string;
  forChats?: boolean;
  company_id?:string
};


/**
 * getCompanyCtws request
 * @param params
 * @returns
 */
export const uploadChatbotFile = async (data:any) => {
  try {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('file', data.file);
    formData.append('company_id', data.company_id);

    const response = await axiosInterceptorInstance.post(
      `${AI}/chatbot-file`,
      formData, 
      {
        headers: {
          Authorization: getHeaderWithAuth(),
          'Content-Type': 'multipart/form-data', 
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("uploadChatbotFile err", err);
  }
};

/**
 * createCtw request
 * @param params
 * @returns
 */
export const getChatbotFilesAPI = async (params: GetChatbotFilesParams) => {
  try {
    const response = await axiosInterceptorInstance.get(`${AI}/chatbot-files/${params?.company_id}`, {
      params: prepareConditions(params),
      headers: {
        Authorization: getHeaderWithAuth(),
      },
    });
    return response?.data ?? [];
  } catch (err) {
    console.log("getChatbotFiles err", err);
  }
};


/**
 * getCompanyCtws request
 * @param params
 * @returns
 */
export const updateChatbotFilesAPI = async (data:any) => {
  try {
    const formData = new FormData();
    formData.append('name', data?.data?.name);
    formData.append('file', data?.data?.file);

    const response = await axiosInterceptorInstance.put(
      `${AI}/${data.chatbot_id}`,
      formData, 
      {
        headers: {
          Authorization: getHeaderWithAuth(),
          'Content-Type': 'multipart/form-data', 
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("uploadChatbotFile err", err);
  }
};


/**
 * deleteChatbotById request
 * @param chatbotId
 * @returns
 */
export const deleteChatbotByIdAPI = async (chatbot_id: string) => {
  try {
    const response = await axiosInterceptorInstance.delete(
      `${AI}/${chatbot_id}`,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log('deleteChatbotByIdAPI err', err);
  }
};


