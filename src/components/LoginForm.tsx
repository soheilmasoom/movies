import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  FormControlLabel,
  Grid,
  Link,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { BsLock } from "react-icons/bs";
import { Copyright, getCenter } from "./MuiCustoms";
import { themeRadius, themeShadows } from "../context/Theme";
import React, { useContext, useState } from "react";
import { CheckAccount, CheckAccountType } from "../context/CheckAccount";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { moviesAPI } from "../App";

// Types
interface LoginFormProps {
  activeStep: number;
  handleNext: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ activeStep, handleNext }) => {
  const checkAccount = useContext<CheckAccountType>(CheckAccount);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [logMethod, setLogMethod] = useState<"api" | "default">("default");
  const [reqToken, setReqToken] = useState<string>("");
  const md = useMediaQuery("(min-width:768px)");
  const navigate = useNavigate();

  // Schema
  const schema = yup.object().shape({
    api: yup
      .string()
      .required()
      .min(32, "Api key must have exact 32 charachters")
      .max(32, "Api key must have exact 32 charachters"),
    auth: yup.string().required(),
  });

  // Form Hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // Submition
  const submition = async (event: any = {}) => {
    logMethod === "default" && event.preventDefault();
    const res = await moviesAPI.get("/3/authentication/token/new", {
      params: {
        api_key: checkAccount.apiKey,
      },
      headers: {
        Authorization: checkAccount.authCode,
      },
    });

    if (res.data.success) {
      window.open(
        `https://www.themoviedb.org/authenticate/${res.data.request_token}`,
        "_blank"
      );
    }

    setReqToken(res.data.request_token);
    handleNext();
  };

  // Change Contact
  const changeContact = async (data: any) => {
    const checkedAuth = data?.auth.includes("Bearer")
      ? data?.auth
      : `Bearer ${data?.auth}`;

    logMethod === "api" && checkAccount.changeApiKey(data?.api);
    logMethod === "api" && checkAccount.changeAuthCode(checkedAuth);

    submition();
  };

  // Session ID Req
  const createSession = async () => {
    try {
      const res = await moviesAPI.post(
        `/3/authentication/session/new?api_key=${checkAccount.apiKey}&request_token=${reqToken}`,
        {},
        {
          params: {
            api_key: checkAccount.apiKey,
          },
          headers: {
            Authorization: checkAccount.authCode,
          },
        }
      );
      localStorage.setItem("session_id", res.data.session_id);
      checkAccount.changeIsLogged(true);
      navigate("/", { replace: true });
    } catch (error) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 6000);
    }
  };

  return (
    <Grid item xs={12} md={6} order={md ? 1 : 0}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "min(100%, 22rem)",
          maxHeight: "32rem",
          marginLeft: "auto",
          marginRight: md ? 0 : "auto",
          marginTop: "-1rem",
          padding: "0.5rem 1.5rem",
          borderRadius: themeRadius[0],
          background: "transparent",
          boxShadow: themeShadows[4],
        }}
      >
        {/* Header */}
        <Avatar sx={{ m: 1, bgcolor: "primary.dark" }}>
          <BsLock />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>

        {/* 1st Step */}
        <Box
          component="form"
          onSubmit={
            logMethod === "api" ? handleSubmit(changeContact) : submition
          }
          noValidate
          sx={{ mt: 1, display: activeStep === 0 ? "block" : "none" }}
          width={"100%"}
        >
          <RadioGroup
            aria-labelledby="logging-method-select"
            name="logging-method"
            value={logMethod}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setLogMethod(event.target.value as "api" | "default");
            }}
          >
            <Box>
              <FormControlLabel
                value="default"
                control={<Radio />}
                label="Default"
              />
            </Box>

            <FormControlLabel
              value="api"
              control={<Radio />}
              label="User Contant"
            />
            <Box sx={{ marginBottom: 2, marginTop: -1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="api"
                label="API Key"
                disabled={logMethod === "api" ? false : true}
                autoFocus
                sx={{
                  marginBottom: 0,
                  "& fieldset": {
                    borderColor: errors?.api && "error.main",
                  },
                }}
                {...register("api")}
              />
              <Typography variant="subtitle2" color="error.main">
                {errors.api?.message ==
                  "Api key must have exact 32 charachters" &&
                  errors.api?.message}
              </Typography>

              <TextField
                margin="normal"
                required
                fullWidth
                id="auth"
                label="Authorization"
                disabled={logMethod === "api" ? false : true}
                autoFocus
                sx={{
                  marginBottom: 0,
                  "& fieldset": {
                    borderColor: errors?.auth && "error.main",
                  },
                }}
                {...register("auth")}
              />
            </Box>
          </RadioGroup>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Link
              onClick={() => navigate("/signup")}
              variant="body2"
              sx={{ cursor: "pointer" }}
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Box>

        {/* 2nd Step */}
        <Box
          sx={{
            display: activeStep === 1 ? "block" : "none",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            marginX: "auto",
          }}
        >
          <Typography
            marginTop="1.5rem"
            marginBottom="0.5rem"
            textAlign="center"
          >
            Create Your Session
          </Typography>
          <Button
            fullWidth
            variant="contained"
            onClick={createSession}
            sx={{ mt: 3, mb: 2 }}
          >
            Continue
          </Button>
        </Box>

        <Copyright sx={{ marginTop: 5, marginBottom: 4 }} />
      </Box>

      {/* Alert */}
      <Alert
        severity="error"
        sx={{
          ...getCenter.static,
          top: "7.5rem",
          zIndex: (theme) => theme.zIndex.fab,
          width: "20rem",
          display: showAlert ? "flex" : "none",
        }}
      >
        <AlertTitle>Session Denied</AlertTitle>
        Maybe you didn't aproved the session.
      </Alert>
    </Grid>
  );
};

export default LoginForm;
