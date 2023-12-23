import { createSlice, Dispatch } from "@reduxjs/toolkit";

import axiosInstance from "../../config/axios";
import { setShowSnackBar } from "./snackBar";
import { AxiosError } from "axios";

interface ErrorResponse {
  status: string;
  message: string;
}

export interface User {
  name: string;
  password: string;
}

export interface UserSliceState {
  user: string | undefined;
  loading: boolean;
  isAuth: boolean;
  error: string | null;
}

const initialState: UserSliceState = {
  user: undefined,
  isAuth: false,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action) => {
      (state.user = action.payload.user),
        (state.isAuth = action.payload.isAuth),
        (state.loading = false),
        (state.error = null);
    },
    setUserLoader: (state, action) => {
      state.loading = action.payload;
    },
    setUserError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, setUserLoader, setUserError } = userSlice.actions;

export const handleAuth =
  (data: User, isSignin: boolean) => async (dispatch: Dispatch) => {
    try {
      dispatch(setUserLoader(true));

      const response = await axiosInstance.post(
        !isSignin ? "/user/signin" : "/user/signup",
        data
      );
      const userData = response?.data;

     await localStorage.setItem("token", userData.token);
      dispatch(
        setUser({
          user: userData?.name,
          isAuth: true,
        })
      );
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const err = axiosError?.response?.data;

      dispatch(
        setShowSnackBar({
          message: err?.message || "An error occurred",
          status: "error",
          show: true,
        })
      );
      dispatch(setUserLoader(false));
    }
  };

export default userSlice.reducer;
