import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useRoute = () => {
  const [currentPath, setCurrentPath] = useState("/");
  const location = useLocation();

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  return { currentPath };
};
