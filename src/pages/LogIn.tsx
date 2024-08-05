import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import { BsLock } from "react-icons/bs";
import {
  Grid,
  RadioGroup,
  Stack,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import { useContext, useState } from "react";
import { Copyright, getCenter, Section } from "../components/MuiCustoms";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { moviesAPI } from "../App";
import { useNavigate } from "react-router-dom";
import { CheckAccount, CheckAccountType } from "../context/CheckAccount";
import { themeRadius, themeShadows } from "../context/Theme";

// Steps
const steps = ["Select The Login Method", "Create The Session"];

export default function SignIn() {
  const checkAccount = useContext<CheckAccountType>(CheckAccount);
  const [logMethod, setLogMethod] = useState<"api" | "default">("default");
  const [activeStep, setActiveStep] = useState<number>(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [reqToken, setReqToken] = useState<string>("");
  const navigate = useNavigate();

  // Stepper Fn
  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };
  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  // Schema
  const schema = yup.object().shape({
    api: yup
      .string()
      .required()
      .min(32, "Api key must have exact 32 charachters")
      .max(32, "Api key must have exact 32 charachters"),
    auth: yup
      .string()
      .required()
      .min(32, "Authorization code must have exact 32 charachters")
      .max(32, "Authorization code must have exact 32 charachters"),
  });

  // Form Hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // Submition
  const onSubmit = async (data: any) => {
    logMethod === "api" && checkAccount.changeApiKey(data?.api);

    const res = await moviesAPI.get("/3/authentication/token/new", {
      params: {
        api_key: checkAccount.apiKey,
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

  // Session ID Req
  const createSession = async () => {
    const res = await moviesAPI.post(
      `/3/authentication/session/new?api_key=${checkAccount.apiKey}&request_token=${reqToken}`
    );
    localStorage.setItem("session_id", res.data.session_id);
    checkAccount.changeIsLogged(true);
    navigate("/", { replace: true });
  };

  return (
    <Section paddingX>
      {/* Guideline */}
      <Grid item xs={12} md={5}>
        <Box sx={{ marginLeft: "auto", marginBottom: 2 }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Box>

        <Box sx={{ ...getCenter.flex, height: "80%", width: "100%" }}>
          {/* 1st Step */}
          <Stack sx={{ display: activeStep === 0 ? "flex" : "none" }}>
            <Typography variant="body1" marginBottom="1.5rem">
              <span style={{ fontWeight: 700 }}>1st Step: </span>
              By the login method you select, you will be redirected to TMDB
              website and asked for permission. There are two methods below for
              login:
            </Typography>

            <Typography fontWeight={700}>Default</Typography>
            <Typography variant="body1" marginBottom="1rem">
              You are able to get logged with the default authorized account.
            </Typography>

            <Typography fontWeight={700}>User Contant</Typography>
            <Typography variant="body1">
              You are able to get logged with the default authorized account.
            </Typography>
            <Typography variant="body1">
              <span style={{ fontWeight: 550 }}>Notice: </span>
              API key and authorization code are available on your TMDB
              dashtboard.
            </Typography>
          </Stack>

          {/* 2nd Step */}
          <Stack sx={{ display: activeStep === 1 ? "flex" : "none" }}>
            <Typography variant="body1">
              <span style={{ fontWeight: 700 }}>2nd Step: </span>
              If you have approved the account, click on "Continue".
            </Typography>
          </Stack>
        </Box>
      </Grid>

      {/* Login Form */}
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "min(100%, 22rem)",
            maxHeight: "32rem",
            marginLeft: "auto",
            marginTop: "-1rem",
            padding: "0.5rem 1.5rem",
            borderRadius: themeRadius[0],
            background: "transparent",
            boxShadow: themeShadows[4],
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.dark" }}>
            <BsLock />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>

          {/* 1st Step */}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
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
              <Box sx={{ marginBottom: 2, marginTop: -2 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="api"
                  label="API Key"
                  disabled={logMethod === "api" ? false : true}
                  autoFocus
                  sx={{ marginBottom: 0 }}
                  {...register("api")}
                />
                <Typography variant="subtitle2" color="error.main">
                  {errors.api?.message}
                </Typography>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="auth"
                  label="Authorization"
                  disabled={logMethod === "api" ? false : true}
                  autoFocus
                  sx={{ marginBottom: 0 }}
                  {...register("auth")}
                />
                <Typography variant="subtitle2" color="error.main">
                  {errors.api?.message}
                </Typography>
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
      </Grid>
    </Section>
  );
}
