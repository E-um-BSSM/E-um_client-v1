import styled from "@emotion/styled";
import { css } from "@emotion/css";

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  gap: 1rem;
`;

function NotFoundPage() {
  return (
    <Container>
      <h1
        className={css`
          font-size: 3.75rem;
          font-weight: 700;
          line-height: 160%;
          color: var(--primary-500);
        `}
      >
        404 Not Found
      </h1>
      <p
        className={css`
          text-align: center;
          font-weight: 400;
          line-height: 130%;
          font-size: 1.125rem;
          color: var(--text-muted);
        `}
      >
        죄송합니다. 페이지를 찾을 수 없습니다. <br />
        존재하지 않는 주소를 입력하셨거나, 요청하신 페이지의 주소가 변경/삭제 되어 찾을 수 없습니다.
      </p>
    </Container>
  );
}

export default NotFoundPage;
