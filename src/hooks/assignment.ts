import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { assignmentDELETE, assignmentGET, assignmentPATCH, assignmentPOST } from "@/apis/class";
import type { assignmentCreateRequest, assignmentUpdateRequest, pageRequest } from "@/models";

export const assignmentKeys = {
  all: ["assignments"] as const,
  byClass: (classId: number) => ["assignments", classId] as const,
  list: (classId: number, params?: pageRequest) => ["assignments", classId, "list", params ?? {}] as const,
  detail: (classId: number, assignmentId: number) => ["assignments", classId, "detail", assignmentId] as const,
};

const isValidId = (id: number): boolean => Number.isInteger(id) && id > 0;

export function useAssignments(classId: number, params?: pageRequest, enabled = true) {
  return useQuery({
    queryKey: assignmentKeys.list(classId, params),
    queryFn: () => assignmentGET.getAssignments(classId, params),
    enabled: enabled && isValidId(classId),
  });
}

export function useAssignment(classId: number, assignmentId: number, enabled = true) {
  return useQuery({
    queryKey: assignmentKeys.detail(classId, assignmentId),
    queryFn: () => assignmentGET.getAssignment(classId, assignmentId),
    enabled: enabled && isValidId(classId) && isValidId(assignmentId),
  });
}

export function useCreateAssignment(classId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: assignmentCreateRequest) => assignmentPOST.createAssignment(classId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assignmentKeys.byClass(classId) });
    },
  });
}

export function useUpdateAssignment(classId: number, assignmentId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: assignmentUpdateRequest) => assignmentPATCH.updateAssignment(classId, assignmentId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assignmentKeys.byClass(classId) });
    },
  });
}

export function useDeleteAssignment(classId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (assignmentId: number) => assignmentDELETE.deleteAssignment(classId, assignmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assignmentKeys.byClass(classId) });
    },
  });
}
