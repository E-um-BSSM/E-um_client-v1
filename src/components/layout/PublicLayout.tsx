import { Header } from "@/components/layout/public";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import type { PageType } from "@/types/Page";

function PublicLayout() {
  const defaultPageType: PageType = "public";
  const [pageType, setPageType] = useState(defaultPageType);
  // 홈 화면(/app) 자동 이동은 현재 비활성화합니다.
  // useEffect(() => {
  //   if (isHydrated && isAuthenticated) {
  //     navigate("/app", { replace: true });
  //   }
  // }, [isAuthenticated, isHydrated, navigate]);

  return (
    <div className="publicLayout">
      <header>
        <Header type={pageType} />
      </header>

      <main>
        <Outlet context={setPageType} />
      </main>
    </div>
  );
}

export default PublicLayout;
