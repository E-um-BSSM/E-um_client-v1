import { req } from "@/apis/axiosInstance";
import type { classScheduleResponse, globalResponse } from "@/models";

export const scheduleGET = {
  classScheduleListSearch: async (
    class_id: number,
  ): Promise<globalResponse<{ schedules: classScheduleResponse[] }>> => {
    const response = await req.get(`/classes/${class_id}/schedules`);
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
