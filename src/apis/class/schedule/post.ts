import { req } from "@/apis/axiosInstance";
import type { classScheduleIdResponse, classScheduleRequset, globalResponse } from "@/models";

export const schedulePOST = {
  classScheduleRegister: async (
    class_id: number,
    body: classScheduleRequset,
  ): Promise<globalResponse<classScheduleIdResponse>> => {
    const response = await req.post(`/classes/${class_id}/schedules`, body);
    return response.data;
  },
};
