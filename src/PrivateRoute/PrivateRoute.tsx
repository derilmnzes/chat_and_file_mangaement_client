
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

export default function ProtectedRoutes() {
  let auth = useAppSelector((state) => state.user.isAuth);
  return auth ? <Outlet /> : <Navigate to="/user/auth" />;
}
