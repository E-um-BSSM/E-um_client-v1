import { Header, Footer } from "@/components/layout/public";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import type { PageType } from "@/types/Page";

function PublicLayout() {
  const defaultPageType: PageType = "public";
  const [pageType, setPageType] = useState(defaultPageType);

  return (
    <div className="publicLayout">
      <header>
        <Header type={pageType} />
      </header>

      <main>
        <Outlet context={setPageType} />
      </main>

      {/* <footer>
        <Footer type={pageType} />
      </footer> */}
    </div>
  );
}

export default PublicLayout;
