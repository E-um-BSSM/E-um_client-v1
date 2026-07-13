import { req } from "@/apis/axiosInstance";

export const assignmentDELETE = {
  deleteAssignment: async (classId: number, assignmentId: number): Promise<void> => {
    await req.delete(`/classes/${classId}/assignments/${assignmentId}`);
  },
};
