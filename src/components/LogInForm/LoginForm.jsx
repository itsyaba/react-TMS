// import * as React from "react";
import * as Yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import { NumberInput, TextInput, Button, Box, Group } from "@mantine/core";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const theme = createTheme();
export default function SignIn() {
  let navigate = useNavigate();
  let { type } = useParams();
  let links;

  // const [nextPage, setNextPage] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [userDetail, setUserDetail] = useState({
    email: "",
    password: "",
  });

  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().max(10).required(),
  });

  useEffect(() => {
    if (
      email === "ad" &&
      password === "ad" &&
      type.toLowerCase() === "admin"
    ) {
      setDisabled(false);
      console.log("you are the admin");
    } else if (
      email === "sa" &&
      password === "sa" &&
      type.toLowerCase() === "super-admin"
    ) {
      setDisabled(false);
      console.log("you are the super-admin");
    } else if (
      email === "op" &&
      password == "op" &&
      type.toLowerCase() === "operator"
    ) {
      setDisabled(false);
      console.log("you are the oprator");
    } else if (
      email === "fc" &&
      password === "fc" &&
      type.toLowerCase() === "finance-officers"
    ) {
      setDisabled(false);
      console.log("you are the Finance Officers");
    } else {
      setDisabled(true);
    }
  }, [email, password, userDetail]); //IF ELSE STATEMENT

  // const valueReciver = (data) => {
  //   setUserDetail({
  //     email: data.email,
  //     password: data.password,
  //   });
  //   setNextPage(true);
  // };

  const keyDownHandeler = (key) => {
    if (key.key == "Enter" && disabled === false) {
      navigate(`/role/${type}`);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 80,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 3, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            // onSubmit={form.onSubmit((values) => valueReciver(values))}
            noValidate
            sx={{ mt: 2, width: 500 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              placeholder="Name"
              // {...form.getInputProps("email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              placeholder="password"
              // {...form.getInputProps("password")}
              value={password}
              onKeyDown={keyDownHandeler}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, marginTop: 30 }}
              onClick={() => navigate(`/role/${type}`)}
              disabled={disabled}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
// Footer
