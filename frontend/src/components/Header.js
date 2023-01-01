import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  AppBar,
  Button,
  CssBaseline,
  Toolbar,
} from "@mui/material";
import useStyles from "../styles/style";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";

function Header() {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <div>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <MenuBookIcon className={classes.icon} />
          <Typography variant="h6">Nutrition Tracker</Typography>
          <LoginIcon sx={{ marginLeft: "auto" }} />
          <Button
            variant="primary"
            color="primary"
            sx={{ marginLeft: "-15px" }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <PersonIcon />
          <Button
            variant="primary"
            color="primary"
            sx={{
              marginLeft: "-15px",
            }}
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
