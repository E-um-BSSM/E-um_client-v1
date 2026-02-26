import { useEffect, useRef, useState } from "react";
import { AxiosError } from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";
import type { PageType } from "@/types/Page";
import { authGET } from "@/apis/user/auth";
import { useAuthStore } from "@/stores";
import { Main } from "../LoginPage/style";

type PageTypeSetter = React.Dispatch<React.SetStateAction<PageType>>;

function BSMCallbackPage() {
  const setPageType = useOutletContext<PageTypeSetter>();
  const navigate = useNavigate();
  const setAuthFromSignIn = useAuthStore(state => state.setAuthFromSignIn);
  const [errorMessage, setErrorMessage] = useState("");
  const hasRequested = useRef(false);

  useEffect(() => {
    setPageType("public");
  }, [setPageType]);

  useEffect(() => {
    if (hasRequested.current) return;
    hasRequested.current = true;

    const runCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const query = Object.fromEntries(params.entries());
      const errorParam = params.get("error");
      const errorDescription = params.get("error_description");

      if (errorParam) {
        setErrorMessage(errorDescription ?? `BSM 인증 실패: ${errorParam}`);
        return;
      }

      if (Object.keys(query).length === 0) {
        setErrorMessage("BSM 인증 정보가 없습니다. 다시 로그인해주세요.");
        return;
      }

      if (!query.state) {
        const savedState = sessionStorage.getItem("bsm_oauth_state");
        if (savedState) {
          query.state = savedState;
        }
      }

      try {
        const response = await authGET.bsmCallback(query);
        sessionStorage.removeItem("bsm_oauth_state");
        setAuthFromSignIn(response.data, true);
        navigate("/app", { replace: true });
      } catch (error) {
        const axiosError = error as AxiosError<unknown>;
        const responseData = axiosError.response?.data;

        if (typeof responseData === "string" && responseData.length > 0) {
          setErrorMessage(responseData);
          return;
        }

        if (responseData && typeof responseData === "object") {
          const objectData = responseData as { data?: unknown; message?: unknown };

          if (typeof objectData.data === "string" && objectData.data.length > 0) {
            setErrorMessage(objectData.data);
            return;
          }

          if (typeof objectData.message === "string" && objectData.message.length > 0) {
            setErrorMessage(objectData.message);
            return;
          }
        }

        setErrorMessage("BSM 로그인 처리에 실패했습니다. 다시 시도해주세요.");
      }
    };

    runCallback();
  }, [navigate, setAuthFromSignIn]);

  return <Main>{errorMessage || "BSM 로그인 처리 중입니다..."}</Main>;
}

export default BSMCallbackPage;
