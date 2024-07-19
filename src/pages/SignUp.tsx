import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BsEyeFill, BsEyeSlashFill, BsLock } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { Copyright } from "../components/MuiCustoms";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useContext, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CustomTheme, DefaultTheme, ThemeContext } from "../context/Theme";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  // Theme
  const defaultTheme = useContext<ThemeContext>(DefaultTheme)
    .theme as CustomTheme;

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };

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
      .oneOf([yup.ref("password")], "Password does not match"),
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

  // console.log(errors.lastName)

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
                {/* <Typography variant="subtitle2" color="error.main">
                  {errors.password?.message}
                </Typography> */}
              </FormControl>
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
                    "Password does not match" &&
                    errors.confirmPassword?.message}
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
    </>
  );
}
