import  { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axiosInstance from "../../config/axios";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/user";
import TextFileRenderer from "../renderFile";

const Home = lazy(() => import("../Home"));
const Auth = lazy(() => import("../Auth"));
const Chat = lazy(() => import("../ChatPage"));
const ProtectedRoutes = lazy(() => import("../../PrivateRoute/PrivateRoute"));

const LazyLoadedHome = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Home />
  </Suspense>
);

const LazyLoadedAuth = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Auth />
  </Suspense>
);

const LazyLoadedChat = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Chat />
  </Suspense>
);

const LazyLoadedProtectedRoutes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ProtectedRoutes />
  </Suspense>
);

export function Router() {
  const dispatch = useAppDispatch();

  const verifyUser = async () => {
    try {
      const res = await axiosInstance.get("/user/verify");
      dispatch(
        setUser({
          isAuth: true,
          user: res.data.name,
        })
      );
    } catch (err) {
      dispatch(
        setUser({
          isAuth: false,
          user: undefined,
        })
      );
      localStorage.removeItem('token')
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LazyLoadedProtectedRoutes />}>
          <Route path="/" element={<LazyLoadedHome />} />
          <Route path="/file/:id" element={<TextFileRenderer  />} />
          <Route path="/chat" element={<LazyLoadedChat />} />
        </Route>
        <Route path="/user/Auth" element={<LazyLoadedAuth />} />
      </Routes>
    </BrowserRouter>
  );
}
