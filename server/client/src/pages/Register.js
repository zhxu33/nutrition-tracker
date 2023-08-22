import { useState } from "react";
import { TextField, Typography, Box, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password2: "",
  });

  const { firstname, lastname, email, password, password2 } = formData;

  if (localStorage.getItem("user")) {
    window.location.replace("/");
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const API_URL = "/api/users/";
  const onClick = async () => {
    if (password !== password2) {
      alert("Password do not match!");
    } else {
      const userData = {
        firstname,
        lastname,
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
        alert("Registration failed, please enter correct info.");
      }
    }
  };

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
          label="First Name *"
          type="text"
          name="firstname"
          variant="outlined"
          onChange={onChange}
          value={firstname}
          sx={{ width: "240px", marginRight: "10px" }}
        />
        <TextField
          label="Last Name *"
          type="text"
          name="lastname"
          variant="outlined"
          onChange={onChange}
          value={lastname}
          sx={{ width: "240px", marginLeft: "10px" }}
        />
      </Box>
      <Box align="center" sx={{ display: "block", marginTop: "20px" }}>
        <TextField
          label="Email Address*"
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
          name="password"
          label="Password *"
          variant="outlined"
          type="password"
          onChange={onChange}
          value={password}
          sx={{ width: "500px" }}
        />
      </Box>
      <Box align="center" sx={{ display: "block", marginTop: "20px" }}>
        <TextField
          name="password2"
          label="Confirm Password *"
          variant="outlined"
          type="password"
          onChange={onChange}
          value={password2}
          sx={{ width: "500px" }}
        />
      </Box>
      <Box align="center" sx={{ display: "block", marginTop: "20px" }}>
        <Button onClick={onClick} variant="contained" sx={{ width: "500px" }}>
          Register
        </Button>
      </Box>
    </>
  );
}

export default Register;
