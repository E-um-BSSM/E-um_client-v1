import { req } from "@/apis/axiosInstance";
import type { globalResponse } from "@/models";

export const scheduleDELETE = {
  classScheduleDelete: async (class_id: number, schedule_id: number): Promise<globalResponse<object>> => {
    const response = await req.delete(`/classes/${class_id}/schedules/${schedule_id}`);
    return response.data;
  },
};
