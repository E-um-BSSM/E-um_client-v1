import { Footer, AppHeader } from "@/components/layout/public";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <>
      <AppHeader />

      <main>
        <Outlet />
      </main>

      <Footer type="app" />
    </>
  );
}

export default AppLayout;
