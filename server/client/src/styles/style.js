import { createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3, 0, 0),
  },
  icon: {
    marginRight: "20px",
  },
  button: {
    marginTop: "10px",
  },
  cardGrid: {
    padding: "20px 0",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    flexGrow: 1,
  },
  cardMedia: {
    paddingTop: "56.25%",
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: "50px 0",
  },
}));

export default useStyles;
