import {
  Box,
  Button,
  Grid,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { getCenter, Section } from "../components/MuiCustoms";
import LoginForm from "../components/LoginForm";
import { IoArrowBack } from "react-icons/io5";

// Steps
const steps = ["Select The Login Method", "Create The Session"];

export default function SignIn() {
  const [skipped, setSkipped] = useState(new Set<number>());
  const [activeStep, setActiveStep] = useState<number>(0);

  // Breakpoints
  const sm = useMediaQuery("(min-width:480px)");
  const md = useMediaQuery("(min-width:768px)");

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

  // Back Button Fn
  const handleBack = () => {
    window.open("/login", "_self");
  };

  return (
    <Section paddingX={sm ? true : false}>
      <Grid item xs={12} md={5} order={md ? 0 : 1}>
        <Box sx={{marginBottom: md ? 2 : 5 }}>
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

        <Box sx={{ ...getCenter.flex, height: "80%", width: "100%", textAlign: md ? "left" : "center" }}>
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
            <Button
              startIcon={<IoArrowBack />}
              onClick={handleBack}
              sx={{ width: "5rem", marginTop: "3rem" }}
            >
              Back
            </Button>
          </Stack>
        </Box>
      </Grid>
      <LoginForm activeStep={activeStep} handleNext={handleNext} />
    </Section>
  );
}
