import React, { useEffect, useState, useRef } from "react";
import Header from "../header/Header";
import classes from "../header/Header.module.css"; // Import to use the same class
import Footer from "../footer/Footer";

function Layout({ children }) {
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null); // Best: use ref instead of querySelector

  useEffect(() => {
    const updateHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    // Initial measure
    updateHeight();

    // Update on resize (covers mobile keyboard, orientation change, etc.)
    window.addEventListener("resize", updateHeight);

    // Optional: use ResizeObserver for maximum accuracy (even if content inside header changes)
    const resizeObserver = new ResizeObserver(updateHeight);
    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateHeight);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* Pass ref to Header and use the correct className */}
      <div ref={headerRef} className={classes.fixed}>
        <Header />
      </div>

      {/* Dynamic padding instead of margin (better for layout) */}
      <main style={{ paddingTop: `${headerHeight}px`, minHeight: "100vh" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
