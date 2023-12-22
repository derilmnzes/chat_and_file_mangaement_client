import React from "react";

import Stack from '@mui/material/Stack';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert ,{ AlertProps } from '@mui/material/Alert';
import { setShowSnackBar } from "../redux/features/snackBar";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


export default function CustomizedSnackbars() {
    const snacBar = useAppSelector((state) => state.snackbar);
    const dispatch = useAppDispatch();
  
 

  const handleClose = (event:React.SyntheticEvent | Event,reason?:string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(
        setShowSnackBar({
          show: false,
          message: "",
          status:"success",
        })
      );

      console.log(event)
  };

 

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
    
       <Snackbar onClose={handleClose} open={snacBar.show} autoHideDuration={6000} >
        <Alert onClose={handleClose}  severity={snacBar.status} sx={{ width: '100%' }}>
          {snacBar.message}
        </Alert>
      </Snackbar>
    
    </Stack>
  );
}
