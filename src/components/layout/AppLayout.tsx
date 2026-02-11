import { Footer, Header } from "@/components/layout/public";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="appLayout">
      <header>
        <Header type="app" />
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <Footer type="app" />
      </footer>
    </div>
  );
}

export default AppLayout;
