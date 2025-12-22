import { useOutletContext } from "react-router-dom";
import type { PageType } from "@/types/Page";
import { useEffect } from "react";

type PageTypeSetter = React.Dispatch<React.SetStateAction<PageType>>;

function LandingPage() {
  const setPageType = useOutletContext<PageTypeSetter>();

  useEffect(() => {
    setPageType("landing");
  }, []);

  return <></>;
}

export default LandingPage;
