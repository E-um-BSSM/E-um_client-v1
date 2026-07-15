import { Header } from "@/components/layout/public";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { PageType } from "@/types/Page";
import { useAuthStore } from "@/stores";

function PublicLayout() {
  const defaultPageType: PageType = "public";
  const [pageType, setPageType] = useState(defaultPageType);
  const navigate = useNavigate();
  const isHydrated = useAuthStore(state => state.isHydrated);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  useEffect(() => {
    if (isHydrated && isAuthenticated) {
      navigate("/app", { replace: true });
    }
  }, [isAuthenticated, isHydrated, navigate]);

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
