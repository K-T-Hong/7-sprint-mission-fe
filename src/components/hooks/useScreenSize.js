import { useEffect, useState } from "react";
import { SCREEN_SIZE } from "./SCREEN_SIZE";

export function useScreenSize() {
  const getScreenSize = () => {
    if (window.innerWidth < 744) return SCREEN_SIZE.MOBILE;
    if (window.innerWidth < 1200) return SCREEN_SIZE.TABLET;
    return SCREEN_SIZE.DESKTOP;
  };

  const [screenSize, setScreenSize] = useState(getScreenSize());

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
}
