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
import LogoutIcon from "@mui/icons-material/Logout";

function Header() {
  const classes = useStyles();
  const navigate = useNavigate();

  let foundUser = false;
  if (localStorage.getItem("user")) {
    foundUser = true;
  }

  const logoutClicked = () => {
    navigate("/login");
    localStorage.removeItem("user");
  };

  const dashboardClicked = () => {
    navigate("/");
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <MenuBookIcon className={classes.icon} />
          <Typography
            variant="h6"
            onClick={dashboardClicked}
            sx={{ cursor: "pointer" }}
          >
            Nutritrack
          </Typography>
          {foundUser ? (
            <>
              <LogoutIcon sx={{ marginLeft: "auto" }} />
              <Button
                variant="primary"
                color="primary"
                sx={{ marginLeft: "-15px" }}
                onClick={logoutClicked}
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
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
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
