import { req } from "../../axiosInstance";
import type { assignmentRequest, assignmentResponse, assignmentSubmitRequest, assignmentSubmitResponse, globalResponse } from "../../../models/index";

export const assiginmentApi = {
  assignmentCreate: async (class_id: number, body: assignmentRequest): Promise<globalResponse<assignmentResponse>> => {
    const response = await req.post(`/classes/${class_id}/assignments`, body);
    return response.data;
  },
  assignmentSearch: async (class_id: number): Promise<globalResponse<object>> => {
    const response = await req.get(`/classes/${class_id}/assignments`);
    const data = {
      classes: response.data.data.classes as assignmentResponse[],
    };
    return {
      ...response.data,
      data,
    };
  },
  assignmentUpdate: async (
    class_id: number,
    assignment_id: number,
    body: assignmentRequest,
  ): Promise<globalResponse<assignmentResponse>> => {
    const response = await req.patch(`/classes/${class_id}/assignments/${assignment_id}`, body);
    return response.data;
  },
  assignmentDelete: async (
    class_id: number,
    assignment_id: number,
  ): Promise<globalResponse<object>> => {
    await req.delete(`/classes/${class_id}/${assignment_id}`);
    return {
      success : true,
      data: {},
    }
  },
  assignmentSubmit: async (
    class_id: number,
    assignment_id: number,
    body: assignmentSubmitRequest,
  ): Promise<globalResponse<assignmentSubmitResponse>> => {
    const response = await req.post(`/classes/${class_id}/assignments/${assignment_id}`, body);
    return response.data;
  },
  assignmentSubmitDelete: async (
    class_id: number,
    assignment_id: number,
    user_id:string,
  ): Promise<globalResponse<object>> => {
    await req.delete(`/classes/${class_id}/${assignment_id}/${user_id}`);
    return {
      success : true,
      data: {},
    }
  },
};
