
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  show: boolean;
}

const initialState: ModalState = {
  show: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<{ show: boolean; }>) => {
      state.show = action.payload.show;
    },
  },
});

export const { setModal } = modalSlice.actions;
export default modalSlice.reducer;
