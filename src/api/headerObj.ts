import store from "@/store/index";

export const getHeaderWithAuth = () => {
  const authToken = store?.getState()?.authToken;
  return `Bearer ${authToken}`;
};

export const prepareConditions = (params) => {
  let conditions: any = {
    limit: 7,
  };
  if (params?.limit) {
    conditions.limit = params.limit;
  }

  if (params?.offset) {
    conditions.offset = params.offset;
  }

  if (params?.search) {
    conditions.search = params.search;
  }

  if (params?.searchKey) {
    conditions.searchKey = params.searchKey;
  }

  if (params?.filter) {
    conditions.filter = params.filter;
  }

  if (params?.fields) {
    conditions.fields = params.fields;
  }

  if (params?.commi_insta_user_id) {
    conditions.commi_insta_user_id = params.commi_insta_user_id;
  }

  if (params?.commi_fb_page_id) {
    conditions.commi_fb_page_id = params.commi_fb_page_id;
  }

  if (params?.waba_meta_id) {
    conditions.waba_meta_id = params.waba_meta_id;
  }

  if (params?.business_phone_id) {
    conditions.business_phone_id = params.business_phone_id;
  }

  if (params?.waba_id) {
    conditions.waba_id = params.waba_id;
  }

  if (params?.phone_number_id) {
    conditions.phone_number_id = params?.phone_number_id;
  }

  if (params?.parent_broadcast_id) {
    conditions.parent_broadcast_id = params?.parent_broadcast_id;
  }

  conditions.forChats = params?.forChats ?? false;

  return conditions;
};
