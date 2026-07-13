import { req } from "@/apis/axiosInstance";
import type {
  classDetailResponse,
  classSearchRequest,
  classSummaryPageResponse,
  myClassSearchRequest,
} from "@/models";

export const classGET = {
  searchClasses: async (params?: classSearchRequest): Promise<classSummaryPageResponse> => {
    const response = await req.get(`/classes/search`, { params });
    return response.data;
  },
  getMyClasses: async (params?: myClassSearchRequest): Promise<classSummaryPageResponse> => {
    const response = await req.get(`/classes/my`, { params });
    return response.data;
  },
  getClass: async (classId: number): Promise<classDetailResponse> => {
    const response = await req.get(`/classes/${classId}`);
    return response.data;
  },
};
