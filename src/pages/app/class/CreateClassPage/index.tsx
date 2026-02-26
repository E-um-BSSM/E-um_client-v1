import { useState, type ChangeEvent } from "react";
import { css } from "@emotion/react";
import { Input, Button } from "@/components/ui/atom";
import {
  Container,
  Inner,
  PageTitle,
  Section,
  SectionHeader,
  SectionTitle,
  SectionDesc,
  BannerWrapper,
  BannerPreview,
  FileSelectionWrapper,
  FileNameInput,
  UploadButton,
  Textarea,
  PrivacyGrid,
  PrivacyBox,
  RadioCircle,
  PrivacyInfo,
  PrivacyTitle,
  PrivacyDesc,
  SubmitWrapper,
} from "./styles";
import DLcircleFull from "@/assets/DLcircle_primary-400.svg";
import DLcircleEmpty from "@/assets/DLcircle_natural-300.svg";

type PrivacyStatus = "PUBLIC" | "PARTIAL" | "PRIVATE";

function CreateClassPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const [privacy, setPrivacy] = useState<PrivacyStatus>("PUBLIC");
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const isFormValid = title.trim() !== "" && description.trim() !== "";

  return (
    <Container>
      <Inner>
        <PageTitle>클래스 개설하기</PageTitle>

        {/* Banner Section */}
        <Section>
          <SectionHeader>
            <SectionTitle>클래스 배너 이미지</SectionTitle>
            <SectionDesc>16:9 비율이 가장 적절해요</SectionDesc>
          </SectionHeader>
          <BannerWrapper>
            <BannerPreview bgImage={bannerPreview} />
            <FileSelectionWrapper>
              <FileNameInput>{bannerFile ? bannerFile.name : "파일을 선택해주세요"}</FileNameInput>
              <UploadButton>
                파일 선택
                <input type="file" accept="image/*" onChange={handleFileChange} />
              </UploadButton>
            </FileSelectionWrapper>
          </BannerWrapper>
        </Section>

        {/* Title Section */}
        <Section>
          <SectionHeader>
            <SectionTitle>클래스 제목</SectionTitle>
            <SectionDesc>자신의 클래스 제목을 설정하세요</SectionDesc>
          </SectionHeader>
          <Input placeholder="클래스 제목" value={title} onChange={e => setTitle(e.target.value)} />
        </Section>

        {/* Intro Section */}
        <Section>
          <SectionHeader>
            <SectionTitle>클래스 소개</SectionTitle>
            <SectionDesc>자신의 클래스 소개글을 작성하세요</SectionDesc>
          </SectionHeader>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <span style={{ color: "#64748B", fontSize: "1.125rem", fontWeight: 400 }}>
              <span style={{ color: "var(--primary-500)", fontWeight: 600 }}>*</span> 난이도 설정
            </span>
            <div style={{ display: "flex", gap: "0.25rem" }}>
              {[1, 2, 3, 4, 5].map(level => (
                <img
                  key={level}
                  src={level <= difficulty ? DLcircleFull : DLcircleEmpty}
                  alt={`difficulty-${level}`}
                  width={20}
                  height={20}
                  onClick={() => setDifficulty(level)}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </div>
          </div>
          <Textarea placeholder="클래스 소개" value={description} onChange={e => setDescription(e.target.value)} />
        </Section>

        {/* Privacy Section */}
        <Section>
          <SectionHeader>
            <SectionTitle>공개 설정</SectionTitle>
            <SectionDesc>클래스 공개 상태를 설정하세요</SectionDesc>
          </SectionHeader>
          <PrivacyGrid>
            <PrivacyBox active={privacy === "PUBLIC"} onClick={() => setPrivacy("PUBLIC")}>
              <RadioCircle active={privacy === "PUBLIC"} />
              <PrivacyInfo>
                <PrivacyTitle>공개</PrivacyTitle>
                <PrivacyDesc>설명</PrivacyDesc>
              </PrivacyInfo>
            </PrivacyBox>
            <PrivacyBox active={privacy === "PARTIAL"} onClick={() => setPrivacy("PARTIAL")}>
              <RadioCircle active={privacy === "PARTIAL"} />
              <PrivacyInfo>
                <PrivacyTitle>일부 공개</PrivacyTitle>
                <PrivacyDesc>설명</PrivacyDesc>
              </PrivacyInfo>
            </PrivacyBox>
            <PrivacyBox active={privacy === "PRIVATE"} onClick={() => setPrivacy("PRIVATE")}>
              <RadioCircle active={privacy === "PRIVATE"} />
              <PrivacyInfo>
                <PrivacyTitle>비공개</PrivacyTitle>
                <PrivacyDesc>설명</PrivacyDesc>
              </PrivacyInfo>
            </PrivacyBox>
          </PrivacyGrid>
        </Section>

        <SubmitWrapper>
          <Button
            activate={isFormValid}
            customStyle={css`
              width: 11.75rem;
              height: 3.75rem;
              border-radius: 0.75rem;
              font-size: 1.125rem;
              font-weight: 500;
            `}
          >
            글 올리기
          </Button>
        </SubmitWrapper>
      </Inner>
    </Container>
  );
}

export default CreateClassPage;
