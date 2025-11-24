import { PublicHeader, Footer } from "@/components/public";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import type { FooterType } from "@/types/Page";

function PublicLayout() {
  const [footerType, setFooterType] = useState("public" as FooterType);
  return (
    <div className="publicLayout">
      <header>
        <PublicHeader />
      </header>

      <main>
        <Outlet context={setFooterType} />
      </main>

      <footer>
        <Footer type={footerType} />
      </footer>
    </div>
  );
}

export default PublicLayout;
