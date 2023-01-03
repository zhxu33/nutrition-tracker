import { useState } from "react";
import {
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  CardActions,
  CardMedia,
  Input,
  Box,
} from "@mui/material";
import useStyles from "../styles/style";
import axios from "axios";

function List({ list, userData, updateLists }) {
  const classes = useStyles();

  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    name: list.name,
    date: list.date,
    calories: list.calories,
    carbs: list.carbs,
    fat: list.fat,
    protein: list.protein,
  });

  const { name, date, calories, carbs, fat, protein } = formData;

  const editClicked = () => {
    setEdit(!edit);
    if (edit === true) {
      const API_URL = "/api/lists/" + list._id;
      const config = {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      };
      const listData = {
        name: name,
        date: date,
      };
      axios.put(API_URL, listData, config).then((response) => {
        console.log(response.data);
      });
    }
  };

  const deleteClicked = () => {
    const API_URL = "/api/lists/" + list._id;
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };
    axios.delete(API_URL, config).then((response) => {
      console.log(response.data);
      updateLists();
    });
  };

  const viewClicked = () => {
    window.location.replace("/list/" + list._id);
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const cancelClicked = (e) => {
    setFormData({
      name: list.name,
      date: list.date,
    });
    setEdit(!edit);
  };

  const dateFormat = () => {
    let formatting = new Date(date);
    formatting = formatting.toLocaleString([], {
      timeZone: "UTC",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formatting.replace(",", "");
  };

  const inputDateFormat = () => {
    let format = dateFormat();
    format =
      format.substr(6, 4) +
      "-" +
      format.substr(0, 2) +
      "-" +
      format.substr(3, 2);
    return format;
  };

  return (
    <>
      {edit ? (
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={"https://source.unsplash.com/1600x900?" + name}
              title="Image title"
            />
            <CardContent className={classes.cardContent}>
              <Input
                placeholder="Plan Name"
                type="text"
                name="name"
                onChange={onChange}
                value={name}
                sx={{
                  width: "300px",
                  marginTop: "-5.5px",
                  marginBottom: "2.5px",
                  fontSize: "23.7px",
                  display: "block",
                }}
              />
              <Input
                type="date"
                name="date"
                onChange={onChange}
                defaultValue={inputDateFormat()}
                sx={{
                  width: "150px",
                  marginTop: "-5.5px",
                  marginBottom: "2.5px",
                  fontSize: "16px",
                }}
              />
              <Box sx={{ marginTop: "10px" }}>
                <Typography noWrap sx={{ fontSize: "13px" }}>
                  Total • Calories: {calories} • Carbs: {carbs}g • Fat: {fat}g •
                  Protein: {protein}g
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Button onClick={cancelClicked} size="small" color="primary">
                Cancel
              </Button>
              <Button
                onClick={editClicked}
                size="small"
                sx={{ color: "green" }}
              >
                Confirm
              </Button>
              <Button
                onClick={deleteClicked}
                size="small"
                sx={{ color: "red" }}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ) : (
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={"https://source.unsplash.com/1600x900?" + name}
              title="Image title"
            />
            <CardContent className={classes.cardContent}>
              <Typography noWrap gutterBottom variant="h5">
                {name}
              </Typography>
              <Typography style={{ wordWrap: "break-word" }}>
                {dateFormat()}
              </Typography>
              <Box sx={{ marginTop: "10px" }}>
                <Typography noWrap sx={{ fontSize: "13px" }}>
                  Total • Calories: {calories} • Carbs: {carbs}g • Fat: {fat}g •
                  Protein: {protein}g
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Button onClick={viewClicked} size="small" color="primary">
                View
              </Button>
              <Button
                onClick={editClicked}
                size="small"
                sx={{ color: "green" }}
              >
                Edit
              </Button>
              <Button
                onClick={deleteClicked}
                size="small"
                sx={{ color: "red" }}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid>
      )}
    </>
  );
}

export default List;
