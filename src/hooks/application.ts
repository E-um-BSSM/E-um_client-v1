import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { applicationGET, applicationPUT } from "@/apis/class";
import type { applicationFormUpdateRequest } from "@/models";

export const applicationKeys = {
  all: ["application-form"] as const,
  form: (classId: number) => ["application-form", classId] as const,
};

const isValidId = (id: number): boolean => Number.isInteger(id) && id > 0;

export function useApplicationForm(classId: number, enabled = true) {
  return useQuery({
    queryKey: applicationKeys.form(classId),
    queryFn: () => applicationGET.getApplicationForm(classId),
    enabled: enabled && isValidId(classId),
  });
}

export function usePutApplicationForm(classId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: applicationFormUpdateRequest) => applicationPUT.putApplicationForm(classId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicationKeys.form(classId) });
    },
  });
}
