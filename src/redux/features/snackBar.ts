import { AlertColor } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SnackbarState {
  show: boolean;
  message: string;
  status: AlertColor;
}

const initialState: SnackbarState = {
  show: false,
  message: "",
  status: "success",
};

const snackBarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setShowSnackBar: (state, action: PayloadAction<{ show: boolean; message: string; status: AlertColor }>) => {
      state.show = action.payload.show;
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
  },
});

export const { setShowSnackBar } = snackBarSlice.actions;
export default snackBarSlice.reducer;
