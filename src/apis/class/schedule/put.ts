import { req } from "@/apis/axiosInstance";
import type { classScheduleRequset, classScheduleResponse, globalResponse } from "@/models";

export const schedulePUT = {
  classScheduleUpdate: async (
    class_id: number,
    schedule_id: number,
    body: classScheduleRequset
  ): Promise<globalResponse<classScheduleResponse>> => {
    const response = await req.put(`/classes/${class_id}/schedules/${schedule_id}`, body);
    return response.data;
  },
};