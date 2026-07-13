import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { submissionDELETE, submissionGET, submissionPATCH, submissionPOST } from "@/apis/class";
import type { submissionCreateRequest, submissionFeedbackRequest, submissionSearchRequest } from "@/models";

export const submissionKeys = {
  all: ["submissions"] as const,
  byAssignment: (classId: number, assignmentId: number) => ["submissions", classId, assignmentId] as const,
  list: (classId: number, assignmentId: number, params?: submissionSearchRequest) =>
    ["submissions", classId, assignmentId, "list", params ?? {}] as const,
  detail: (classId: number, assignmentId: number, submissionId: number) =>
    ["submissions", classId, assignmentId, "detail", submissionId] as const,
};

const isValidId = (id: number): boolean => Number.isInteger(id) && id > 0;

export function useSubmissions(
  classId: number,
  assignmentId: number,
  params?: submissionSearchRequest,
  enabled = true,
) {
  return useQuery({
    queryKey: submissionKeys.list(classId, assignmentId, params),
    queryFn: () => submissionGET.getSubmissions(classId, assignmentId, params),
    enabled: enabled && isValidId(classId) && isValidId(assignmentId),
  });
}

export function useSubmission(
  classId: number,
  assignmentId: number,
  submissionId: number,
  enabled = true,
) {
  return useQuery({
    queryKey: submissionKeys.detail(classId, assignmentId, submissionId),
    queryFn: () => submissionGET.getSubmission(classId, assignmentId, submissionId),
    enabled: enabled && isValidId(classId) && isValidId(assignmentId) && isValidId(submissionId),
  });
}

export function useSubmitAssignment(classId: number, assignmentId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: submissionCreateRequest) => submissionPOST.submitAssignment(classId, assignmentId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: submissionKeys.byAssignment(classId, assignmentId) });
    },
  });
}

export function useCancelSubmission(classId: number, assignmentId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (submissionId: number) => submissionDELETE.cancelSubmission(classId, assignmentId, submissionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: submissionKeys.byAssignment(classId, assignmentId) });
    },
  });
}

export function useGradeSubmission(classId: number, assignmentId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ submissionId, body }: { submissionId: number; body: submissionFeedbackRequest }) =>
      submissionPATCH.gradeSubmission(classId, assignmentId, submissionId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: submissionKeys.byAssignment(classId, assignmentId) });
    },
  });
}
