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
import { MiniMentoringCard, FindClassButton, ClassSearchBar, RadioSwitch } from "@/components";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { classPOST } from "@/apis/class/class";
import type { classResponse } from "@/models";

type LoadState = "idle" | "loading" | "success" | "error";
type RoleFilter = "Mento" | "Menti";

export default function MyPage() {
  const navigate = useNavigate();

  const [goingClasses, setGoingClasses] = useState<classResponse[]>([]);
  const [recruitingClasses, setRecruitingClasses] = useState<classResponse[]>([]);
  const [state, setState] = useState<LoadState>("idle");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("Mento");

  useEffect(() => {
    let isMounted = true;

    const fetchClassList = async () => {
      setState("loading");
      try {
        const [goingResponse, recruitingResponse] = await Promise.all([
          classPOST.classListSearch({ status: "GOING" }),
          classPOST.classListSearch({ status: "RECRUITING" }),
        ]);

        const goingContent = goingResponse.data.content ?? goingResponse.data.classes ?? [];
        const recruitingContent = recruitingResponse.data.content ?? recruitingResponse.data.classes ?? [];

        if (!isMounted) {
          return;
        }

        if (goingContent.length === 0 && recruitingContent.length === 0) {
          const fallback = await classPOST.classListSearch();
          const allClasses = fallback.data.content ?? fallback.data.classes ?? [];
          setGoingClasses(allClasses);
          setRecruitingClasses([]);
        } else {
          setGoingClasses(goingContent);
          setRecruitingClasses(recruitingContent);
        }

        setState("success");
      } catch {
        if (!isMounted) {
          return;
        }

        setGoingClasses([]);
        setRecruitingClasses([]);
        setState("error");
      }
    };

    fetchClassList();

    return () => {
      isMounted = false;
    };
  }, []);

  const goingCount = goingClasses.length;
  const recruitingCount = recruitingClasses.length;

  const emptyMessage = useMemo(() => {
    if (state === "loading") {
      return "강좌 정보를 불러오는 중이에요";
    }

    if (state === "error") {
      return "강좌 정보를 불러오지 못했어요";
    }

    return "현재 진행 중인 멘토링이 없어요";
  }, [state]);

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
    <>
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
                  멘토링 중인 강좌 <Cnt>{goingCount}</Cnt>
                </Text>
              </TextContainer>
              <MyMentoringCardContainer>
                {goingClasses.length > 0
                  ? goingClasses.map(item => (
                      <MiniMentoringCard
                        key={item.class_id}
                        title={item.title}
                        lecturer={item.created_by}
                        onClick={() => navigate(`/app/class/detail?classId=${item.class_id}`)}
                      />
                    ))
                  : renderEmpty(emptyMessage)}
              </MyMentoringCardContainer>
            </MyWrapper>
            {roleFilter === "Mento" && (
              <MyWrapper>
                <TextContainer>
                  <Text>
                    모집 중인 강좌 <Cnt>{recruitingCount}</Cnt>
                  </Text>
                </TextContainer>
                <MyRecruitmentCardContainer>
                  {recruitingClasses.length > 0
                    ? recruitingClasses.map(item => (
                        <MiniMentoringCard
                          key={item.class_id}
                          title={item.title}
                          lecturer={item.created_by}
                          onClick={() => navigate(`/app/class/detail?classId=${item.class_id}`)}
                        />
                      ))
                    : renderEmpty("현재 모집 중인 강좌가 없어요")}
                </MyRecruitmentCardContainer>
              </MyWrapper>
            )}
          </MyContainer>
        </ContentContainer>
      </Container>
    </>
  );
}
