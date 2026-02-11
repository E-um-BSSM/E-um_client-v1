import { req } from "@/apis/axiosInstance";
import type { classScheduleRequest, classScheduleResponse, globalResponse } from "@/models";

export const schedulePATCH = {
  classScheduleUpdate: async (
    class_id: number,
    schedule_id: number,
    body: classScheduleRequest,
  ): Promise<globalResponse<classScheduleResponse>> => {
    const response = await req.patch(`/classes/${class_id}/schedules/${schedule_id}`, body);
    return response.data;
  },
};
