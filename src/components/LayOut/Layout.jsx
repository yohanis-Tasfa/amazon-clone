import React, { useEffect, useState } from "react";
import Header from "../header/Header";

function Layout({ children }) {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const adjustMargin = () => {
      const header = document.querySelector(".fixed_header");
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };

    adjustMargin();
    window.addEventListener("resize", adjustMargin);

    return () => window.removeEventListener("resize", adjustMargin);
  }, []);

  return (
    <div>
      <Header />
      <div style={{ marginTop: `${headerHeight}px` }}>{children}</div>
    </div>
  );
}

export default Layout;
