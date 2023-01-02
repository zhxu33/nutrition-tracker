import { useState, useEffect } from "react";
import {
  Typography,
  Container,
  TextField,
  Box,
  IconButton,
  CardMedia,
} from "@mui/material";
import useStyles from "../styles/style";
import { useParams } from "react-router-dom";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import Item from "../components/Item";

function List() {
  const classes = useStyles();
  const params = useParams();

  const [items, setItems] = useState([]);
  const [list, setList] = useState({});
  const [input, setInput] = useState("");

  let userData;

  if (!localStorage.getItem("user")) {
    window.location.replace("/login");
  } else {
    userData = JSON.parse(localStorage.getItem("user"));
  }

  useEffect(() => {
    const API_URL = "/api/items/" + params.id;
    const API_URL2 = "/api/lists/" + params.id;

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };
    axios.get(API_URL, config).then((response) => {
      setItems(response.data);
    });
    axios.get(API_URL2, config).then((response) => {
      setList(response.data);
    });
  }, [params.id, userData.token]);

  const updateItems = () => {
    const API_URL = "/api/items/" + params.id;
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };
    axios.get(API_URL, config).then((response) => {
      setItems(response.data);
    });
  };

  const addItem = () => {
    const API_URL = "/api/items/" + params.id;
    const API_KEY = "922cee6111af498583d623a63f4d5734";
    const API_URL2 =
      "https://api.spoonacular.com/recipes/guessNutrition?apiKey=" +
      API_KEY +
      "&title=" +
      input;
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };
    axios
      .get(API_URL2)
      .then((response) => {
        const itemData = {
          name: input,
          calories: response.data.calories.value,
          carbs: response.data.carbs.value,
          fat: response.data.fat.value,
          protein: response.data.protein.value,
        };
        axios.post(API_URL, itemData, config).then(() => {
          axios.get(API_URL, config).then((response) => {
            setItems(response.data);
          });
        });
      })
      .catch(() => {
        const itemData = {
          name: input,
        };
        axios.post(API_URL, itemData, config).then(() => {
          axios.get(API_URL, config).then((response) => {
            setItems(response.data);
          });
        });
      });
  };

  return (
    <main>
      <div className={classes.container}>
        <Container maxWidth="sm">
          <Typography
            variant="h4"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            {list.name}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            {list.description}
          </Typography>
          <Box align="center" sx={{ display: "block", marginBottom: "25px" }}>
            <Typography sx={{ display: "inline", width: "80px" }}>
              Total • Calories: {list.calories}
            </Typography>
            <Typography
              sx={{
                display: "inline",
                marginLeft: "6px",
                width: "80px",
              }}
            >
              • Carbs: {list.carbs}g
            </Typography>
            <Typography
              sx={{
                width: "80px",
                display: "inline",
                marginLeft: "6px",
              }}
            >
              • Fat: {list.fat}g
            </Typography>
            <Typography
              sx={{
                width: "80px",
                display: "inline",
                marginLeft: "6px",
              }}
            >
              • Protein: {list.protein}g
            </Typography>
            <CardMedia
              className={classes.cardMedia}
              image={"https://source.unsplash.com/1600x900?" + list.name}
              title="Image title"
              sx={{ marginTop: "10px" }}
            />
          </Box>
          <Box align="center" sx={{ display: "block", marginBottom: "20px" }}>
            <TextField
              align="center"
              label="Search for a food or dish"
              type="text"
              variant="outlined"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              sx={{ width: "400px" }}
            />
            <IconButton
              onClick={addItem}
              sx={{ marginLeft: "-55px", marginTop: "1px" }}
            >
              <SearchIcon
                sx={{
                  fontSize: "35px",
                  color: "black",
                }}
              />
            </IconButton>
          </Box>
        </Container>
        <Container sx={{ width: "500px" }}>
          {items
            .slice(0)
            .reverse()
            .map((item) => (
              <Item
                key={item._id}
                item={item}
                userData={userData}
                updateItems={updateItems}
              />
            ))}
        </Container>
      </div>
    </main>
  );
}

export default List;
