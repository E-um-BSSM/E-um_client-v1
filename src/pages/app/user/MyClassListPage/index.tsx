import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { classPOST } from "@/apis/class/class";
import { MiniMentoringCard, MiniRecruitmentCard, FindClassButton, ClassSearchBar, RadioSwitch } from "@/components";
import type { ClassroomListPayload, classResponse } from "@/models";
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
} from "./styles";

type RoleFilter = "Mento" | "Menti";

type RecruitmentClass = classResponse & {
  applicantCount: number;
};

type RoleSectionData = {
  mentoringClasses: classResponse[];
  recruitmentClasses: RecruitmentClass[];
};

const getJwtPayload = (token: string) => {
  try {
    const payload = token.split(".")[1];
    if (!payload) {
      return null;
    }

    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = atob(normalized);
    return JSON.parse(decoded) as Record<string, unknown>;
  } catch {
    return null;
  }
};

const getCurrentUsername = () => {
  const directKeys = ["username", "userName", "user_id", "userId"];
  for (const key of directKeys) {
    const value = localStorage.getItem(key) ?? sessionStorage.getItem(key);
    if (value) {
      return value;
    }
  }

  const objectKeys = ["user", "auth", "account", "auth_user"];
  for (const key of objectKeys) {
    const raw = localStorage.getItem(key) ?? sessionStorage.getItem(key);
    if (!raw) {
      continue;
    }

    try {
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      if (typeof parsed.username === "string" && parsed.username) {
        return parsed.username;
      }
      if (typeof parsed.user_id === "string" && parsed.user_id) {
        return parsed.user_id;
      }
    } catch {
      continue;
    }
  }

  const tokenKeys = ["access_token", "accessToken", "token"];
  for (const key of tokenKeys) {
    const token = localStorage.getItem(key) ?? sessionStorage.getItem(key);
    if (!token) {
      continue;
    }

    const payload = getJwtPayload(token);
    if (!payload) {
      continue;
    }

    const username = payload.username;
    if (typeof username === "string" && username) {
      return username;
    }

    const userId = payload.user_id;
    if (typeof userId === "string" && userId) {
      return userId;
    }

    const sub = payload.sub;
    if (typeof sub === "string" && sub) {
      return sub;
    }
  }

  return null;
};

const normalizeClassResponse = (item: classResponse): classResponse => {
  return {
    ...item,
    class_id: item.class_id ?? item.classroom_id,
    class_code: item.class_code ?? item.classroom_code,
  };
};

const extractClassList = (data: ClassroomListPayload): classResponse[] => {
  return data.classrooms.map(normalizeClassResponse);
};

export default function MyPage() {
  const navigate = useNavigate();
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("Mento");
  const [isLoading, setIsLoading] = useState(true);
  const [mentorData, setMentorData] = useState<RoleSectionData>({ mentoringClasses: [], recruitmentClasses: [] });
  const [menteeData, setMenteeData] = useState<RoleSectionData>({ mentoringClasses: [], recruitmentClasses: [] });

  useEffect(() => {
    let isMounted = true;

    const fetchClassList = async () => {
      setIsLoading(true);
      try {
        const activeResponse = await classPOST.classListSearch({ classroomStatus: "ACTIVE" });
        const activeClasses = extractClassList(activeResponse.data);
        const username = getCurrentUsername();
        if (!isMounted) {
          return;
        }

        if (!username) {
          setMentorData({
            mentoringClasses: activeClasses,
            recruitmentClasses: [],
          });
          setMenteeData({
            mentoringClasses: [],
            recruitmentClasses: [],
          });
          return;
        }

        const mentorGoingClasses = activeClasses.filter(item => item.created_by === username);
        const menteeGoingClasses = activeClasses.filter(item => item.created_by !== username);

        if (!isMounted) {
          return;
        }

        setMentorData({
          mentoringClasses: mentorGoingClasses,
          recruitmentClasses: [],
        });
        setMenteeData({
          mentoringClasses: menteeGoingClasses,
          recruitmentClasses: [],
        });
      } catch {
        if (!isMounted) {
          return;
        }
        setMentorData({ mentoringClasses: [], recruitmentClasses: [] });
        setMenteeData({ mentoringClasses: [], recruitmentClasses: [] });
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchClassList();

    return () => {
      isMounted = false;
    };
  }, []);

  const currentData = useMemo(
    () => (roleFilter === "Mento" ? mentorData : menteeData),
    [roleFilter, mentorData, menteeData],
  );
  const recruitmentTitle = roleFilter === "Mento" ? "모집 중인 클래스" : "신청한 모집글";
  const recruitmentEmptyMessage = roleFilter === "Mento" ? "현재 모집 중인 클래스가 없어요" : "신청한 모집글이 없어요";
  const recruitmentCardVariant = roleFilter === "Menti" ? "menti" : "mento";

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
                      key={item.class_id}
                      title={item.title}
                      variant={recruitmentCardVariant}
                      applicantCount={item.applicantCount}
                      mentorName={item.created_by}
                      onActionClick={roleFilter === "Mento" ? () => navigate("/app/class/create") : undefined}
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
                      key={item.class_id}
                      title={item.title}
                      lecturer={item.created_by}
                      onClick={() =>
                        navigate(
                          `/app/class/detail?classId=${item.class_id}&role=${roleFilter === "Mento" ? "mento" : "menti"}`,
                        )
                      }
                    />
                  ))}
            </MyMentoringCardContainer>
          </MyWrapper>
        </MyContainer>
      </ContentContainer>
    </Container>
  );
}
