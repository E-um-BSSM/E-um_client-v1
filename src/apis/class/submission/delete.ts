import { req } from "@/apis/axiosInstance";

export const submissionDELETE = {
  cancelSubmission: async (classId: number, assignmentId: number, submissionId: number): Promise<void> => {
    await req.delete(`/classes/${classId}/assignments/${assignmentId}/submissions/${submissionId}`);
  },
};
