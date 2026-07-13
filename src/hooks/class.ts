import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { classDELETE, classGET, classPATCH, classPOST } from "@/apis/class";
import type { classCreateRequest, classSearchRequest, classUpdateRequest, myClassSearchRequest } from "@/models";

export const classKeys = {
  all: ["classes"] as const,
  search: (params?: classSearchRequest) => ["classes", "search", params ?? {}] as const,
  my: (params?: myClassSearchRequest) => ["classes", "my", params ?? {}] as const,
  detail: (classId: number) => ["classes", "detail", classId] as const,
};

const isValidId = (id: number): boolean => Number.isInteger(id) && id > 0;

export function useClassSearch(params?: classSearchRequest, enabled = true) {
  return useQuery({
    queryKey: classKeys.search(params),
    queryFn: () => classGET.searchClasses(params),
    enabled,
  });
}

export function useMyClasses(params?: myClassSearchRequest, enabled = true) {
  return useQuery({
    queryKey: classKeys.my(params),
    queryFn: () => classGET.getMyClasses(params),
    enabled,
  });
}

export function useClass(classId: number, enabled = true) {
  return useQuery({
    queryKey: classKeys.detail(classId),
    queryFn: () => classGET.getClass(classId),
    enabled: enabled && isValidId(classId),
  });
}

export function useCreateClass() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: classCreateRequest) => classPOST.createClass(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: classKeys.all });
    },
  });
}

export function useUpdateClass(classId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: classUpdateRequest) => classPATCH.updateClass(classId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: classKeys.detail(classId) });
      queryClient.invalidateQueries({ queryKey: classKeys.all });
    },
  });
}

export function useDeleteClass() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (classId: number) => classDELETE.deleteClass(classId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: classKeys.all });
    },
  });
}
