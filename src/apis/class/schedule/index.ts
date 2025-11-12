import { req } from "../../axiosInstance";
import type { classScheduleRequset, classScheduleResponse, globalResponse } from "../../../models/index";

export const scheduleApi = {
  classScheduleListSearch: async (
    class_id: number,
  ): Promise<globalResponse<{ schedules: classScheduleResponse[] }>> => {
    const response = await req.get(`/classes/${class_id}/schedules`);
    const data = {
      schedules: response.data.data.schedules as classScheduleResponse[],
    };
    return {
      ...response.data,
      data,
    };
  },
  classScheduleRegister: async (
    class_id: number,
    body: classScheduleRequset,
  ): Promise<globalResponse<{ schedule_id: number }>> => {
    const response = await req.post(`/classes/${class_id}/schedules`, body);
    return response.data;
  },
  classScheduleDelete: async (class_id: number, schedule_id: number): Promise<globalResponse<object>> => {
    await req.delete(`/classes/${class_id}/schedules/${schedule_id}`);
    return {
      success: true,
      data: {},
    };
  },
  classScheduleUpdate: async (
    class_id: number,
    schedule_id: number,
    body: classScheduleRequset,
  ): Promise<globalResponse<classScheduleResponse>> => {
    const response = await req.put(`/classes/${class_id}/schedules/${schedule_id}`, body);
    return response.data;
  },
  classScheduleSingleSearch: async (
    class_id: number,
    schedule_id: number,
  ): Promise<globalResponse<classScheduleResponse>> => {
    const response = await req.get(`/classes/${class_id}/schedules/${schedule_id}`);
    return response.data;
  },
};
