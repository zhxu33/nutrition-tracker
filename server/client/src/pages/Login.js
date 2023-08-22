import { useState } from "react";
import { TextField, Typography, Box, Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  if (localStorage.getItem("user")) {
    window.location.replace("/");
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const API_URL = "/api/users/login";
  const onClick = async () => {
    const userData = {
      email,
      password,
    };
    try {
      const response = await axios.post(API_URL, userData);
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/");
      }
    } catch (error) {
      alert("The username or password you entered is incorrect.");
    }
  };

  return (
    <>
      <Box align="center" sx={{ display: "block", marginTop: "50px" }}>
        <LoginIcon sx={{ display: "inline" }} />
        <Typography variant="h4" sx={{ display: "inline" }}>
          Login
        </Typography>
        <Typography variant="h6" sx={{ display: "block" }}>
          Login and start tracking your nutrition data
        </Typography>
      </Box>
      <Box align="center" sx={{ display: "block", marginTop: "20px" }}>
        <TextField
          label="Email Address *"
          type="email"
          name="email"
          variant="outlined"
          onChange={onChange}
          value={email}
          sx={{ width: "500px" }}
        />
      </Box>
      <Box align="center" sx={{ display: "block", marginTop: "20px" }}>
        <TextField
          label="Password *"
          variant="outlined"
          name="password"
          type="password"
          onChange={onChange}
          value={password}
          sx={{ width: "500px" }}
        />
      </Box>
      <Box align="center" sx={{ display: "block", marginTop: "20px" }}>
        <Button onClick={onClick} variant="contained" sx={{ width: "500px" }}>
          Login
        </Button>
      </Box>
    </>
  );
}

export default Login;
