import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "@emotion/styled";
import { DifficultyLevel, MarkdownView } from "@/components";
import { useClass } from "@/hooks";

function RecruitmentDetailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const classId = Number(searchParams.get("classId"));
  const validClassId = Number.isInteger(classId) && classId > 0;

  const { data: classInfo } = useClass(classId, validClassId);

  const guide = classInfo?.guide?.trim();

  const handleApply = () => {
    if (!validClassId) return;
    // 신청은 항상 지원서 작성 페이지로 이동(지원서가 없으면 그 화면에서 바로 신청)
    navigate(`/app/class/apply?classId=${classId}`);
  };

  return (
    <Page>
      <Layout>
        {/* 왼쪽: 모집글 작성 시 넣은 멘토링 안내(guide) */}
        <Guide>
          {guide ? <MarkdownView>{guide}</MarkdownView> : <EmptyText>멘토링 안내가 아직 없어요</EmptyText>}
        </Guide>

        {/* 오른쪽: 멘토 · 제목 · 난이도 · 신청 */}
        <Aside>
          <Mentor>
            <Avatar src="/eum.png" alt="멘토 프로필" />
            <MentorName>{classInfo?.mentor?.nickname ?? "멘토"}</MentorName>
          </Mentor>
          {classInfo?.mentor_introduction && <MentorIntro>{classInfo.mentor_introduction}</MentorIntro>}
          <Title>{classInfo?.title ?? "클래스 제목"}</Title>
          <DifficultyLevel level={classInfo?.difficulty ?? 0} />
          <ApplyButton type="button" disabled={!validClassId} onClick={handleApply}>
            멘토링 신청하기
          </ApplyButton>
        </Aside>
      </Layout>
    </Page>
  );
}

export default RecruitmentDetailPage;

/* ── styles ─────────────────────────────────────────────── */

const Page = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 3rem 5rem 5rem;
  box-sizing: border-box;
`;

const Layout = styled.div`
  display: flex;
  gap: 4rem;
  width: 100%;
  max-width: 80rem;
  align-items: flex-start;
`;

const Guide = styled.div`
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
  min-width: 0;
`;

const EmptyText = styled.p`
  font-family: Pretendard;
  font-size: 1.125rem;
  color: var(--text-muted);
`;

const Aside = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 28.125rem;
  flex-shrink: 0;
`;

const Mentor = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Avatar = styled.img`
  width: 2.8125rem;
  height: 2.8125rem;
  border-radius: 50%;
  object-fit: cover;
`;

const MentorName = styled.span`
  font-family: Pretendard;
  font-size: 1.375rem;
  font-weight: 500;
  color: var(--text-primary);
`;

const MentorIntro = styled.p`
  margin: -0.75rem 0 0;
  font-family: Pretendard;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--text-muted);
`;

const Title = styled.p`
  margin: 0;
  font-family: Pretendard;
  font-size: 1.875rem;
  font-weight: 500;
  line-height: 1.3;
  color: var(--text-primary);
`;

const ApplyButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3.75rem;
  border: none;
  border-radius: 0.75rem;
  background: var(--primary-500);
  color: var(--white);
  font-family: Pretendard;
  font-size: 1.125rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: var(--primary-700);
  }
  &:disabled {
    background: var(--natural-300);
    color: var(--text-muted);
    cursor: default;
  }
`;
