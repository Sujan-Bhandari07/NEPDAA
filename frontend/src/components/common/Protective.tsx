import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/Hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetuserQuery } from "../../store/userapi";

const Protective = ({ children }: { children: React.ReactNode }) => {
  const { isauth } = useAppSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoading, isError } = useGetuserQuery();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    setAuthChecked(true);

    if (isauth && location.pathname === "/login") {
      navigate("/");
    } else if (!isauth && location.pathname !== "/login") {
      navigate("/login");
    }
  }, [navigate, location, isauth, isLoading, isError]);

  if (!authChecked) {
    return null;
  }

  return <>{children}</>;
};

export default Protective