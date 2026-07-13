import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { noticeDELETE, noticeGET, noticePATCH, noticePOST } from "@/apis/class";
import type { noticeCreateRequest, noticeUpdateRequest, pageRequest } from "@/models";

export const noticeKeys = {
  all: ["notices"] as const,
  byClass: (classId: number) => ["notices", classId] as const,
  list: (classId: number, params?: pageRequest) => ["notices", classId, "list", params ?? {}] as const,
  detail: (classId: number, noticeId: number) => ["notices", classId, "detail", noticeId] as const,
};

const isValidId = (id: number): boolean => Number.isInteger(id) && id > 0;

export function useNotices(classId: number, params?: pageRequest, enabled = true) {
  return useQuery({
    queryKey: noticeKeys.list(classId, params),
    queryFn: () => noticeGET.getNotices(classId, params),
    enabled: enabled && isValidId(classId),
  });
}

export function useNotice(classId: number, noticeId: number, enabled = true) {
  return useQuery({
    queryKey: noticeKeys.detail(classId, noticeId),
    queryFn: () => noticeGET.getNotice(classId, noticeId),
    enabled: enabled && isValidId(classId) && isValidId(noticeId),
  });
}

export function useCreateNotice(classId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: noticeCreateRequest) => noticePOST.createNotice(classId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: noticeKeys.byClass(classId) });
    },
  });
}

export function useUpdateNotice(classId: number, noticeId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: noticeUpdateRequest) => noticePATCH.updateNotice(classId, noticeId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: noticeKeys.byClass(classId) });
    },
  });
}

export function useDeleteNotice(classId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (noticeId: number) => noticeDELETE.deleteNotice(classId, noticeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: noticeKeys.byClass(classId) });
    },
  });
}
