import axiosInterceptorInstance from "@/utils/axios";
import { getHeaderWithAuth } from "./headerObj";
import { PROMPTS } from "@/utils/routes/apiRoutes";

export const findaiagent = async () => {
    try{
        const response = await axiosInterceptorInstance.get(
            `${PROMPTS}`,
            {
                headers:{
                    Authorization: getHeaderWithAuth()
                }
            }
        )
        console.log(response?.data)
        return response?.data ?? []
    }catch(err){
        console.log("findaiagent err",err)
    }
}


export const findaiagentbyid = async (params) => {
    try{
        const response = await axiosInterceptorInstance.get(
            `${PROMPTS}/${params?.id}`,
            {
                headers:{
                    Authorization: getHeaderWithAuth()
                }
            }
        )
        return response?.data ?? []
    }catch(err){
        console.log("findaiagent err",err)
    }
}


/**
 * add a user request
 * @param params
 * @returns
 */
export const addaiagent = async (params) => {
  try {
    const response = await axiosInterceptorInstance.post(
      `${PROMPTS}`,
      params,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("addaiagent err", err);
  }
};


/**
 * update a user request
 * @param params
 * @returns
 */
export const updateprompts = async (params) => {
  try {
    const response = await axiosInterceptorInstance.put(
      `${PROMPTS}/${params?.prompt_id}`,
      params?.data,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("updateaiagent err", err);
  }
};


/**
 * remove a user request
 * @param params
 * @returns
 */
export const removeprompt = async (params) => {
  try {
    const response = await axiosInterceptorInstance.delete(
      `${PROMPTS}/${params?.prompt_id}`,
      {
        headers: {
          Authorization: getHeaderWithAuth(),
        },
      }
    );
    return response?.data ?? [];
  } catch (err) {
    console.log("removeaiagent err", err);
  }
};