import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Link, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setShowSnackBar } from "../redux/features/snackBar";
import { User, handleAuth } from "../redux/features/user";
import { useNavigate } from "react-router-dom";

enum FormType {
  Signup,
  Signin,
}

export default function Auth() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector((state) => state.user.loading);
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const [formType, setFormType] = useState<FormType>(FormType.Signup);
  const [formState, setFormState] = useState<User>({
    name: "",
    password: "",
  });

 
  useEffect(() => {
   
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formState?.password?.length < 8) {
      dispatch(
        setShowSnackBar({
          show: true,
          message: "Please enter 8 digit password",
          status: "error",
        })
      );
      return;
    }
    if (formType === 0) {
      dispatch(handleAuth(formState, true));
    } else {
      dispatch(handleAuth(formState, false));
    }
  };

  const toggleFormType = () => {
    setFormType(
      formType === FormType.Signup ? FormType.Signin : FormType.Signup
    );
  };

  return (
    <div className="flex h-[100vh] flex-col items-center justify-center">
      <div className="md:h-[50%]  shadow-xl w-[80%] m-auto md:w-1/3  p-10 rounded-lg">
        <Typography component="h1" textAlign="center" variant="h5">
          {formType === FormType.Signup ? "Sign Up" : "Sign In"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="name"
            name="name"
            autoComplete="name"
            autoFocus
            value={formState.name}
            onChange={handleFormChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formState.password}
            onChange={handleFormChange}
          />
          <Button
            disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            {loading
              ? "Loading ..."
              : formType === FormType.Signup
              ? "Sign Up"
              : "Sign In"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link variant="body2" onClick={toggleFormType}>
                {formType === FormType.Signup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}
