import React from "react";
import { TextField, Typography, Box, Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

function Login() {
  return (
    <>
      <Box align="center" sx={{ display: "block", marginTop: "50px" }}>
        <LoginIcon sx={{ display: "inline" }} />
        <Typography variant="h4" sx={{ display: "inline" }}>
          Login
        </Typography>
        <Typography variant="h5" sx={{ display: "block" }}>
          Login and start tracking nutrition
        </Typography>
      </Box>
      <Box align="center" sx={{ display: "block", marginTop: "20px" }}>
        <TextField
          id="outlined-basic"
          label="Email Address *"
          type="email"
          variant="outlined"
          sx={{ width: "500px" }}
        />
      </Box>
      <Box align="center" sx={{ display: "block", marginTop: "20px" }}>
        <TextField
          id="outlined-basic"
          label="Password *"
          variant="outlined"
          type="password"
          sx={{ width: "500px" }}
        />
      </Box>
      <Box align="center" sx={{ display: "block", marginTop: "20px" }}>
        <Button variant="contained" sx={{ width: "500px" }}>
          Login
        </Button>
      </Box>
    </>
  );
}

export default Login;
