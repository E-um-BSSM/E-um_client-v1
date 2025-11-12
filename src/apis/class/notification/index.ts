import { req } from "../../axiosInstance";
import type { classNotificationRequest, classNotificationResponse, globalResponse } from "../../../models/index";

export const notificationApi = {
  classNotificationSearch: async (class_id: number): Promise<globalResponse<object>> => {
    const response = await req.get(`/classes/${class_id}/notification`);
    const data = {
      notifications: response.data.data.notifications as classNotificationResponse[],
    };
    return {
      ...response.data,
      data,
    };
  },
  classNotificationRegister: async (
    class_id: number,
    body: classNotificationRequest,
  ): Promise<globalResponse<classNotificationResponse>> => {
    const response = await req.post(`/classes/${class_id}/notification`, body);
    return response.data;
  },
  classNotificationUpdate: async (
    class_id: number,
    notification_id: number,
    body: classNotificationRequest,
  ): Promise<globalResponse<classNotificationResponse>> => {
    const response = await req.put(`/classes/${class_id}/notification/${notification_id}`, body);
    return response.data;
  },
  classNotificationDelete: async (
    class_id: number,
    notification_id: number,
  ): Promise<globalResponse<object>> => {
    await req.delete(`/classes/${class_id}/notification/${notification_id}`);
    return{
      success: true,
      data:{}
    }
  },
};
