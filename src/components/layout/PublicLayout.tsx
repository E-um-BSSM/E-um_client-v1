import { PublicHeader } from "@/components/layout/public";
import { Footer } from "@/components/layout/public";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import type { PageType } from "@/types/Page";

function PublicLayout() {
  const defaultPageType: PageType = "public";
  const [pageType, setPageType] = useState(defaultPageType);

  return (
    <>
      <PublicHeader type={pageType} />

      <main>
        <Outlet context={setPageType} />
      </main>

      <Footer type={pageType} />
    </>
  );
}

export default PublicLayout;
