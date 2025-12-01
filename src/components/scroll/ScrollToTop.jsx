// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // This runs every time you navigate to a new page
    window.scrollTo(0, 0);
    // Or use smooth scroll if you want it fancy:
    // window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}
