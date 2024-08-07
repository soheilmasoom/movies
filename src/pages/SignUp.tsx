import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BsEyeFill, BsEyeSlashFill, BsLock, BsX } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { Copyright } from "../components/MuiCustoms";
import {
  Backdrop,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { themeBorder, themeRadius } from "../context/Theme";

export default function SignUp() {
  const [openAlert, setOpenAlert] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  // Schema
  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required().email("Email is not valid"),
    password: yup
      .string()
      .required()
      .min(8, "Password must be in 8-16 characters")
      .max(16, "Password must be in 8-16 characters"),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password")], "Passwords do not match"),
    allowExtraEmails: yup.boolean().oneOf([true]),
  });

  // Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const submition = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "30rem",
          marginX: "auto",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "info.light" }}>
          <BsLock />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(submition)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                sx={{
                  marginBottom: "0",
                  "& fieldset": {
                    borderColor: errors?.firstName && "error.main",
                  },
                }}
                {...register("firstName")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                autoComplete="family-name"
                sx={{
                  marginBottom: "0",
                  "& fieldset": {
                    borderColor: errors?.lastName && "error.main",
                  },
                }}
                {...register("lastName")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                sx={{
                  marginBottom: "0",
                  "& fieldset": {
                    borderColor: errors?.email && "error.main",
                  },
                }}
                {...register("email")}
              />
              <Typography variant="subtitle2" color="error.main">
                {errors.email?.message == "Email is not valid" &&
                  errors.email?.message}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ width: "100%" }} variant="outlined">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  sx={{
                    "& fieldset": {
                      borderColor: errors?.password && "error.main",
                    },
                  }}
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <Typography variant="subtitle2" color="error.main">
                {errors.password?.message ==
                  "Password must be in 8-16 characters" &&
                  errors.password?.message}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <FormControl sx={{ width: "100%" }} variant="outlined">
                <InputLabel htmlFor="confirm-password">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="confirm-password"
                  sx={{
                    "& fieldset": {
                      borderColor: errors?.confirmPassword && "error.main",
                    },
                  }}
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        onMouseDown={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <BsEyeSlashFill />
                        ) : (
                          <BsEyeFill />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                />
                <Typography variant="subtitle2" color="error.main">
                  {errors.confirmPassword?.message ==
                    "Passwords do not match" && errors.confirmPassword?.message}
                </Typography>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    id="allowExtraEmails"
                    color="primary"
                    {...register("allowExtraEmails")}
                  />
                }
                label="I want to receive inspiration, marketing promotions and updates via email."
                sx={{
                  "& .MuiTypography-root, svg": {
                    color: errors.allowExtraEmails?.message && "error.main",
                  },
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />

      {/* Alert */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openAlert}
        onClick={() => setOpenAlert(false)}
      >
        <Box
          sx={{
            background: (theme) => theme.palette.error.dark,
            color: (theme) => theme.palette.background.default,
            border: themeBorder[0],
            borderRadius: themeRadius[0],
            borderColor: (theme) => theme.palette.grey[800],
            width: "25rem",
            padding: "1rem",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="h6" textAlign="center">
            Attention: This page is just a paradigm of a "Sign Up Page"
            implementation. If you want to create an account,{" "}
            <Link
              href="https://www.themoviedb.org/signup"
              target="_blank"
              // onClick={() => setOpenAlert(false)}
              sx={{
                color: (theme) => theme.palette.background.paper,
                textDecorationColor: (theme) => theme.palette.grey[600],
                textUnderlineOffset: 3,
              }}
            >
              Click Here
            </Link>{" "}
            to sign up on TMDB website.
          </Typography>

          <IconButton
            aria-label="close-alert"
            onClick={() => setOpenAlert(false)}
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              transform: "translate(40%,-40%)",
              background: (theme) => theme.palette.grey[800],
              "&:hover": {
                background: (theme) => theme.palette.grey[900],
              },
            }}
          >
            <BsX />{" "}
          </IconButton>
        </Box>
      </Backdrop>
    </>
  );
}
