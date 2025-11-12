import { req } from "../axiosInstance";
import type { classRequest, classResponse, classSearchRequest, globalResponse } from "../../models/index";

export const classApi = {
  classSingleSearch: async (class_id: number): Promise<globalResponse<classResponse>> => {
    const response = await req.get(`/classes/search/${class_id}`);
    return response.data;
  },
  classCreate: async (body: classRequest): Promise<globalResponse<classResponse>> => {
    const response = await req.post("/classes/create", body);
    return response.data;
  },
  classListSearch: async (body: classSearchRequest): Promise<globalResponse<object>> => {
    const response = await req.post("/classes/search", body);
    const data = {
      classes: response.data.data.classes as classResponse[],
    };
    return {
      ...response.data,
      data,
    };
  },
  classUpdate: async (class_id: number): Promise<globalResponse<classResponse>> => {
    const response = await req.patch(`/classes/${class_id}`);
    return response.data;
  },
  classDelete: async (class_id: number): Promise<globalResponse<object>> => {
    await req.delete(`/classes/${class_id}`);
    return {
     success : true,
     data : {},
    };
  },
};
