import  {  lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
