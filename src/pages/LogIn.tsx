import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import { BsLock } from "react-icons/bs";
import { RadioGroup, Step, StepLabel, Stepper } from "@mui/material";
import { useContext, useState } from "react";
import { Copyright } from "../components/MuiCustoms";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { moviesAPI } from "../App";
import { useNavigate } from "react-router-dom";
import { CheckAccount, CheckAccountType } from "../context/CheckAccount";

// Steps
const steps = ["Select The Login Method", "Create The Session"];

export default function SignIn() {
  const checkAccount = useContext<CheckAccountType>(CheckAccount);
  const [logMethod, setLogMethod] = useState<"api" | "default">("api");
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
      .required("Email is required")
      .min(32, "Api key must be exact 32 charachters")
      .max(32, "Api key must be exact 32 charachters"),
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
        api_key: checkAccount.apiKey
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
    <>
      <Box sx={{ width: "35rem", marginX: "auto", marginBottom: 2 }}>
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

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "30rem",
          marginX: "auto",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
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
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={logMethod}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setLogMethod(event.target.value as "api" | "default");
            }}
          >
            <FormControlLabel value="api" control={<Radio />} label="Api Key" />
            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle2" display="block" paddingLeft={1.5}>
                Login with API key
              </Typography>

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
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <FormControlLabel
                value="default"
                control={<Radio />}
                label="Default"
              />
              <Typography variant="subtitle2" display="block" paddingLeft={1.5}>
                Login to the test account without API key
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
            <Link href="#" variant="body2">
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
            width: "30rem",
            marginX: "auto",
          }}
        >
          <Button
            fullWidth
            variant="contained"
            onClick={createSession}
            sx={{ mt: 3, mb: 2 }}
          >
            Continue
          </Button>
        </Box>
      </Box>

      <Copyright sx={{ mt: 8, mb: 4 }} />
    </>
  );
}
