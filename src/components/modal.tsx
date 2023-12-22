import React, { ReactNode } from "react";
import { Button, Modal,  Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setModal } from "../redux/features/modal";

interface SimpleModalProps {
  children: ReactNode;
  open: boolean;
  handleClose: () => void;
  handleClick:()=>void;
}

const SimpleModal: React.FC<SimpleModalProps> = ({
  open,
  children,
  handleClose,
  handleClick
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        {children}
     <div className="flex mt-5 flex-row items-center justify-start">
     <Button
          onClick={handleClose}
          variant="contained"
          color="primary"
        >
          Close
        </Button>
        <Button
          onClick={handleClick}
          variant="contained"
          color="primary"
          sx={{ ml: 2 }}
        >
         Save
        </Button>
     </div>
        
      </Box>
    </Modal>
  );
};

const ModalComponent: React.FC<{ children: ReactNode,handleClick:() => void; }> = ({ children,handleClick }) => {
  const modal = useAppSelector((state) => state.modal.show);
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(
      setModal({
        show: false,
      })
    );
  };
  return (
    <div>
      <SimpleModal open={modal} handleClick={handleClick} handleClose={handleClose}>
        {children}
      </SimpleModal>
    </div>
  );
};

export default ModalComponent;
