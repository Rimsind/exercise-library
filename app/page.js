"use client";

import styled from "@emotion/styled";
import {
  Box,
  FormControl,
  TextField,
  Typography,
  InputAdornment,
  OutlinedInput,
  IconButton,
  Button,
} from "@mui/material";
import Image from "next/image";
import React from "react";

import { useForm } from "react-hook-form";
import axios from "axios";
import { setCookie } from "nookies";
import { useAuth } from "@/context";
import { BASEURL } from "@/config/MainApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Preloader from "@/components/common/Preloader";

const Container = styled(Box)`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #042a4a;
`;

const Wrapper = styled(Box)`
  background: #fff;
  border-radius: 10px;
  width: 400px;
  padding: 40px 10px;
  border: 1px solid #e5e5e5;
  box-shadow: 0px 0px 5px #d7d7d7;
  @media screen and (max-width: 576px) {
    width: 320px;
  }
`;

const FormHeader = styled(Box)`
  text-align: center;
  margin-bottom: 25px;

  & > p {
    color: #656565;
  }
`;

const FormWrapper = styled(Box)`
  width: 75%;
  margin: 10px auto;
  @media screen and (max-width: 576px) {
    width: 90%;
  }
`;

const CustomLable = styled(Box)`
  display: flex;
  align-items: center;
  font-size: 17px;
  margin-bottom: 5px;
  color: #7f7f7f;
  & > svg {
    font-size: 20px;
    margin-right: 4px;
  }
`;

const LoginButton = styled(Button)`
  background: #37a000;
  box-shadow: none;
  width: 200px;
  border-radius: 20px;
  &:hover {
    background: #37a000;
    box-shadow: none;
  }
`;

const LoaderButton = styled(Button)`
  background: #fff;
  box-shadow: none;
`;

const Authenticate = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const Router = useRouter();
  const { dispatchAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  // authenticating user account
  const authenticateUser = async (data, e) => {
    e.preventDefault();
    if (!data.userName || !data.password) {
      alert("Please Enter Email and Password");
      return;
    }
    dispatchAuth({ type: "AUTH_LOADING" });
    setLoading(true);
    try {
      const payload = {
        identifier: data.userName,
        password: data.password,
      };
      const res = await axios.post(`${BASEURL}/auth/local`, payload);
      const result = res.data;
      if (result.jwt && result.user) {
        // set the jwt in the cookies
        setCookie(null, "token", result.jwt, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        // set the user in the cookies
        setCookie(null, "user", JSON.stringify(result.user), {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });

        // set user and jwt in context
        dispatchAuth({
          type: "LOGIN_SUCCESS",
          payload: { token: result.jwt, user: result.user },
        });
        Router.push("/exercise-library");
      }
    } catch (error) {
      setLoading(false);
      alert("Email or Password does not exist");
      console.log(`Error while login: ${error}`);
      dispatchAuth({
        type: "LOGIN_FAILED",
        payload: error.message
          ? error.message
          : "Something went wrong, try again",
      });
    }
  };
  return (
    <>
      <Container>
        <Wrapper>
          <FormHeader>
            <Image
              src="/logo/logo-color.png"
              width={150}
              height={100}
              alt="logo"
            />

            <Typography>Log in to your Dashboard</Typography>
          </FormHeader>
          <form onSubmit={handleSubmit(authenticateUser)}>
            <FormWrapper>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <CustomLable>
                  <AccountCircleOutlinedIcon />
                  Username
                </CustomLable>
                <TextField
                  id="outlined-basic"
                  placeholder="Enter your username"
                  variant="outlined"
                  size="small"
                  {...register("userName")}
                />
              </FormControl>
              <FormControl variant="outlined" fullWidth sx={{ mb: 4 }}>
                <CustomLable>
                  <LockOutlinedIcon />
                  Password
                </CustomLable>
                <OutlinedInput
                  {...register("password")}
                  size="small"
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Box sx={{ textAlign: "center" }}>
                {loading ? (
                  <LoaderButton>
                    <Preloader />
                  </LoaderButton>
                ) : (
                  <LoginButton variant="contained" type="submit">
                    Login
                  </LoginButton>
                )}
              </Box>
            </FormWrapper>
          </form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Authenticate;
