import { useEffect, useState } from "react";

export function usePageSize(desktop, tablet, mobile) {
  const getPageSize = () => {
    if (window.innerWidth < 744) return mobile;
    if (window.innerWidth < 1200) return tablet;
    return desktop;
  };

  const [pageSize, setPageSize] = useState(getPageSize());

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return pageSize;
}
