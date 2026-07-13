import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  inviteGET,
  invitePOST,
  joinDELETE,
  joinPOST,
  memberDELETE,
  memberGET,
  memberPATCH,
} from "@/apis/class";
import type { joinRequest, pageRequest } from "@/models";

export const memberKeys = {
  all: ["members"] as const,
  byClass: (classId: number) => ["members", classId] as const,
  members: (classId: number, params?: pageRequest) => ["members", classId, "list", params ?? {}] as const,
  waiting: (classId: number, params?: pageRequest) => ["members", classId, "waiting", params ?? {}] as const,
  inviteCode: (classId: number) => ["members", classId, "invite"] as const,
};

const isValidId = (id: number): boolean => Number.isInteger(id) && id > 0;

export function useMembers(classId: number, params?: pageRequest, enabled = true) {
  return useQuery({
    queryKey: memberKeys.members(classId, params),
    queryFn: () => memberGET.getMembers(classId, params),
    enabled: enabled && isValidId(classId),
  });
}

export function useWaitingList(classId: number, params?: pageRequest, enabled = true) {
  return useQuery({
    queryKey: memberKeys.waiting(classId, params),
    queryFn: () => memberGET.getWaitingList(classId, params),
    enabled: enabled && isValidId(classId),
  });
}

export function useInviteCode(classId: number, enabled = true) {
  return useQuery({
    queryKey: memberKeys.inviteCode(classId),
    queryFn: () => inviteGET.getInviteCode(classId),
    enabled: enabled && isValidId(classId),
  });
}

export function useCreateInviteCode(classId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => invitePOST.createInviteCode(classId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memberKeys.inviteCode(classId) });
    },
  });
}

export function useApplyToClass(classId: number) {
  return useMutation({
    mutationFn: (body: joinRequest) => joinPOST.applyToClass(classId, body),
  });
}

export function useJoinByCode() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: joinRequest) => joinPOST.joinByCode(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memberKeys.all });
    },
  });
}

export function useCancelApplication(classId: number) {
  return useMutation({
    mutationFn: () => joinDELETE.cancelApplication(classId),
  });
}

export function useAcceptMember(classId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => memberPATCH.acceptMember(classId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memberKeys.byClass(classId) });
    },
  });
}

export function useRemoveMember(classId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => memberDELETE.removeMember(classId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memberKeys.byClass(classId) });
    },
  });
}
