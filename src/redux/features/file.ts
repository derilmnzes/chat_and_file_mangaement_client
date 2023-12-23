import { createSlice, Dispatch } from "@reduxjs/toolkit";

import axiosInstance from "../../config/axios";
import { setShowSnackBar } from "./snackBar";
import { handleAxiosError } from "../../helper/axiosErrorHandler";
import { ReactNode } from "react";

export interface File {
  originalName: string;
  id: string;
  action: ReactNode;
}

export interface fileSliceState {
  files: File[];
  loading: boolean;
  error: string | null;
  file:string;
  update:null | number;
}

const initialState: fileSliceState = {
  files: [],
  file:"",
  loading: false,
  error: null,
  update:null
};

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setFiles: (state, action) => {
      (state.files = action.payload.files), (state.loading = false);
      state.error = null;
    },
    setFileLoader: (state, action) => {
      state.loading = action.payload;
    },
    setFileError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setFileId:(state, action) => {
        state.file = action.payload
      },
      setUpdate:(state,action)=>{
        state.update = action.payload
      }
  },
});

export const { setFileError,setUpdate, setFiles,setFileId, setFileLoader } = fileSlice.actions;

export const getFiles: any = () => async (dispatch: Dispatch) => {
  const token = localStorage.getItem("token");
  try {
    dispatch(setFileLoader(true));

    const response = await axiosInstance.get("/file",{
      headers:{
        "Authorization":`Bearer ${token}`
      }
    });
    const fileData = response?.data;

    dispatch(
      setFiles({
        files: fileData.files,
      })
    );
  } catch (error) {
    const err = handleAxiosError(error);

    dispatch(
      setShowSnackBar({
        message: err?.message || "An error occurred",
        status: "error",
        show: true,
      })
    );
    dispatch(setFileLoader(false));
  }
};

export const uploadFiles = (data: any) => async (dispatch: Dispatch) => {
  try {
    console.log("called");
    dispatch(setFileLoader(true));

   await axiosInstance.post("/file", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(getFiles());
  } catch (error) {
    const err = handleAxiosError(error);

    dispatch(
      setShowSnackBar({
        message: err?.message || "An error occurred",
        status: "error",
        show: true,
      })
    );
    dispatch(setFileLoader(false));
  }
};

export const updateFile = (data: any,file:string) => async (dispatch: Dispatch) => {
    try {
      console.log("called");
      dispatch(setFileLoader(true));
  
     await axiosInstance.put(`/file/${file}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(getFiles());
      dispatch(setFileId(""))
      dispatch(setUpdate(null))
    } catch (error) {
      const err = handleAxiosError(error);
  
      dispatch(
        setShowSnackBar({
          message: err?.message || "An error occurred",
          status: "error",
          show: true,
        })
      );
      dispatch(setFileLoader(false));
    }
  };

export const deleteFile = (id: string) => async (dispatch: Dispatch) => {
  try {
    console.log("called");
    dispatch(setFileLoader(true));

    await axiosInstance.delete(`/file/${id}`);
    dispatch(getFiles());
  } catch (error) {
    const err = handleAxiosError(error);

    dispatch(
      setShowSnackBar({
        message: err?.message || "An error occurred",
        status: "error",
        show: true,
      })
    );
    dispatch(setFileLoader(false));
  }
};

export default fileSlice.reducer;
