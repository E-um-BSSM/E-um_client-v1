import { req } from "@/apis/axiosInstance";
import type { joinByCodeRequest, joinRequest, memberResponse } from "@/models";

export const joinPOST = {
  applyToClass: async (classId: number, body: joinRequest): Promise<memberResponse> => {
    const response = await req.post(`/classes/${classId}/join`, body);
    return response.data;
  },
  /** 초대 코드만으로 클래스를 찾아 가입 신청(멘티). classId를 몰라도 코드로 참가한다. */
  joinByCode: async (body: joinByCodeRequest): Promise<memberResponse> => {
    const response = await req.post(`/classes/join-by-code`, body);
    return response.data;
  },
};
