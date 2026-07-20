import { useCallback, useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { classGET, joinPOST, memberGET } from "@/apis/class";
import { MiniMentoringCard, MiniRecruitmentCard, FindClassButton, ClassSearchBar, RadioSwitch } from "@/components";
import type { classSummaryResponse } from "@/models";
import {
  MyMentoringCardContainer,
  MyWrapper,
  TextContainer,
  Text,
  Cnt,
  Container,
  ContentContainer,
  MyContainer,
  RecentMentoringEmpty,
  TopContainer,
  MyRecruitmentCardContainer,
  InviteJoinArea,
  InviteJoinButton,
  ModalBackdrop,
  ModalPanel,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  InviteJoinForm,
  InviteJoinInput,
  InviteJoinMessage,
} from "./styles";

type RoleFilter = "Mento" | "Menti";

type RecruitmentClass = classSummaryResponse & {
  applicantCount: number;
};

type RoleSectionData = {
  mentoringClasses: classSummaryResponse[];
  recruitmentClasses: RecruitmentClass[];
};

const EMPTY_ROLE_DATA: RoleSectionData = { mentoringClasses: [], recruitmentClasses: [] };

export default function MyPage() {
  const navigate = useNavigate();
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("Mento");
  const [isLoading, setIsLoading] = useState(true);
  const [mentorData, setMentorData] = useState<RoleSectionData>(EMPTY_ROLE_DATA);
  const [menteeData, setMenteeData] = useState<RoleSectionData>(EMPTY_ROLE_DATA);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const [inviteMessage, setInviteMessage] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  const fetchClassList = useCallback(async () => {
    setIsLoading(true);
    try {
      const [mentorActiveResponse, mentorRecruitingResponse, menteeActiveResponse, menteeWaitingResponse] =
        await Promise.all([
          classGET.getMyClasses({ role: "MENTOR", status: "ACTIVE", membership: "ACCEPTED" }),
          classGET.getMyClasses({ role: "MENTOR", status: "RECRUITING" }),
          classGET.getMyClasses({ role: "MENTEE", status: "ACTIVE", membership: "ACCEPTED" }),
          classGET.getMyClasses({ role: "MENTEE", status: "RECRUITING", membership: "WAITING" }),
        ]);

      const mentorRecruitment: RecruitmentClass[] = await Promise.all(
        mentorRecruitingResponse.items.map(async item => {
          let applicantCount = item.mentee_count ?? 0;
          try {
            const waiting = await memberGET.getWaitingList(item.id, { size: 1 });
            applicantCount = waiting.page.total_elements;
          } catch {
            // 대기 리스트 조회 실패 시 요약값 유지
          }
          return { ...item, applicantCount };
        }),
      );

      setMentorData({
        mentoringClasses: mentorActiveResponse.items,
        recruitmentClasses: mentorRecruitment,
      });
      setMenteeData({
        mentoringClasses: menteeActiveResponse.items,
        recruitmentClasses: menteeWaitingResponse.items.map(item => ({ ...item, applicantCount: 0 })),
      });
    } catch {
      setMentorData(EMPTY_ROLE_DATA);
      setMenteeData(EMPTY_ROLE_DATA);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchClassList();
  }, [fetchClassList]);

  const currentData = useMemo(
    () => (roleFilter === "Mento" ? mentorData : menteeData),
    [roleFilter, mentorData, menteeData],
  );
  const recruitmentTitle = roleFilter === "Mento" ? "모집 중인 클래스" : "신청한 모집글";
  const recruitmentEmptyMessage = roleFilter === "Mento" ? "현재 모집 중인 클래스가 없어요" : "신청한 모집글이 없어요";
  const recruitmentCardVariant = roleFilter === "Menti" ? "menti" : "mento";
  const inviteJoinSucceeded = inviteMessage.includes("완료");

  const handleInviteJoin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedInviteCode = inviteCode.trim();

    if (!trimmedInviteCode) {
      setInviteMessage("초대코드를 입력해주세요.");
      return;
    }

    setIsJoining(true);
    try {
      await joinPOST.joinByCode({ invite_code: trimmedInviteCode });
      setInviteMessage("클래스 참가 요청이 완료됐어요.");
      setInviteCode("");
      await fetchClassList();
    } catch (error) {
      setInviteMessage(
        isAxiosError(error) && error.response?.status === 409
          ? "이미 참가한 클래스입니다."
          : "참가에 실패했어요. 초대코드를 다시 확인해주세요.",
      );
    } finally {
      setIsJoining(false);
    }
  };

  const closeInviteModal = () => {
    setIsInviteModalOpen(false);
    setInviteMessage("");
  };

  const renderEmpty = (message: string) => (
    <RecentMentoringEmpty>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <p>👀</p>
        <p
          style={{
            color: "var(--text-muted, #64748B)",
            fontFamily: "Pretendard",
            fontSize: "1.25rem",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
            letterSpacing: "-0.0275rem",
          }}
        >
          {message}
        </p>
      </div>
      <FindClassButton />
    </RecentMentoringEmpty>
  );

  return (
    <Container>
      <ContentContainer>
        <TopContainer>
          <RadioSwitch value={roleFilter} onChange={setRoleFilter} />
          <ClassSearchBar />
        </TopContainer>
        <MyContainer>
          <MyWrapper>
            <TextContainer>
              <Text>
                {recruitmentTitle} <Cnt>{currentData.recruitmentClasses.length}</Cnt>
              </Text>
            </TextContainer>
            <MyRecruitmentCardContainer>
              {!isLoading && currentData.recruitmentClasses.length === 0
                ? renderEmpty(recruitmentEmptyMessage)
                : currentData.recruitmentClasses.map(item => (
                    <MiniRecruitmentCard
                      key={item.id}
                      title={item.title}
                      variant={recruitmentCardVariant}
                      applicantCount={item.applicantCount}
                      mentorName={item.mentor?.nickname ?? ""}
                      onActionClick={
                        roleFilter === "Mento" ? () => navigate(`/app/class/create?classId=${item.id}`) : undefined
                      }
                    />
                  ))}
            </MyRecruitmentCardContainer>
          </MyWrapper>
          <MyWrapper>
            <TextContainer>
              <Text>
                멘토링 중인 강좌 <Cnt>{currentData.mentoringClasses.length}</Cnt>
              </Text>
            </TextContainer>
            <MyMentoringCardContainer isEmpty={!isLoading && currentData.mentoringClasses.length === 0}>
              {!isLoading && currentData.mentoringClasses.length === 0
                ? renderEmpty("현재 진행 중인 멘토링이 없어요")
                : currentData.mentoringClasses.map(item => (
                    <MiniMentoringCard
                      key={item.id}
                      title={item.title}
                      lecturer={item.mentor?.nickname ?? ""}
                      onClick={() =>
                        navigate(
                          `/app/class/detail?classId=${item.id}`,
                        )
                      }
                    />
                  ))}
            </MyMentoringCardContainer>
          </MyWrapper>
        </MyContainer>

        {roleFilter === "Menti" && (
          <InviteJoinArea>
            <InviteJoinButton type="button" onClick={() => setIsInviteModalOpen(true)}>
              초대코드로 참가하기
            </InviteJoinButton>
          </InviteJoinArea>
        )}
      </ContentContainer>

      {isInviteModalOpen && (
        <ModalBackdrop role="presentation" onMouseDown={closeInviteModal}>
          <ModalPanel role="dialog" aria-modal="true" aria-labelledby="invite-join-title" onMouseDown={event => event.stopPropagation()}>
            <ModalHeader>
              <ModalTitle id="invite-join-title">초대코드 입력</ModalTitle>
              <ModalCloseButton type="button" onClick={closeInviteModal} aria-label="닫기">
                ×
              </ModalCloseButton>
            </ModalHeader>
            <InviteJoinForm onSubmit={handleInviteJoin}>
              <InviteJoinInput
                value={inviteCode}
                onChange={event => {
                  setInviteCode(event.target.value);
                  setInviteMessage("");
                }}
                placeholder="초대코드"
                autoFocus
              />
              {inviteMessage && <InviteJoinMessage isSuccess={inviteJoinSucceeded}>{inviteMessage}</InviteJoinMessage>}
              <InviteJoinButton type="submit" disabled={isJoining}>
                {isJoining ? "참가 중" : "참가하기"}
              </InviteJoinButton>
            </InviteJoinForm>
          </ModalPanel>
        </ModalBackdrop>
      )}
    </Container>
  );
}
