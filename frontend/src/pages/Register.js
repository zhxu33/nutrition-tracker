import React from "react";
import { TextField, Typography, Box, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

function Register() {
  return (
    <>
      <Box align="center" sx={{ display: "block", marginTop: "25px" }}>
        <PersonIcon sx={{ display: "inline", fontSize: "30px" }} />
        <Typography variant="h4" sx={{ display: "inline" }}>
          Register
        </Typography>
        <Typography variant="h5" sx={{ display: "block" }}>
          Please create an account
        </Typography>
      </Box>
      <Box align="center" sx={{ display: "block", marginTop: "20px" }}>
        <TextField
          id="outlined-basic"
          label="First Name *"
          variant="outlined"
          sx={{ width: "240px", marginRight: "10px" }}
        />
        <TextField
          id="outlined-basic"
          label="Last Name *"
          variant="outlined"
          sx={{ width: "240px", marginLeft: "10px" }}
        />
      </Box>
      <Box align="center" sx={{ display: "block", marginTop: "20px" }}>
        <TextField
          id="outlined-basic"
          label="Email Address*"
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
        <TextField
          id="outlined-basic"
          label="Confirm Password *"
          variant="outlined"
          type="password"
          sx={{ width: "500px" }}
        />
      </Box>
      <Box align="center" sx={{ display: "block", marginTop: "20px" }}>
        <Button variant="contained" sx={{ width: "500px" }}>
          Register
        </Button>
      </Box>
    </>
  );
}

export default Register;
