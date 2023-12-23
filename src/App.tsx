import "./App.css";
import { Router } from "./pages/routes/routes";
import axiosInstance from "./config/axios";
import { useAppDispatch } from "./redux/hooks";
import { setUser } from "./redux/features/user";
import { useEffect } from "react";


function App() {


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
  return <>
<Router />
  </>;
}

export default App;
