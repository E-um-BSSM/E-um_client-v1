import { req } from "@/apis/axiosInstance";
import type { classScheduleIdResponse, classScheduleRequest, globalResponse } from "@/models";

export const schedulePOST = {
  classScheduleRegister: async (
    class_id: number,
    body: classScheduleRequest,
  ): Promise<globalResponse<classScheduleIdResponse>> => {
    const response = await req.post(`/classes/${class_id}/schedules`, body);
    return response.data;
  },
};
