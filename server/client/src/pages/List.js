import { useState, useEffect } from "react";
import {
  Typography,
  Container,
  TextField,
  Box,
  IconButton,
  Button,
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
  const [autoFill, setAutoFill] = useState(true);

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

  const updateItems = async () => {
    const API_URL = "/api/items/" + params.id;
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };
    axios.get(API_URL, config).then((response) => {
      setItems(response.data);
      let i = response.data.length - 1;
      while (i >= 0) {
        if (response.data[i].image !== "") {
          const image = response.data[i].image;
          setList((prevState) => ({
            ...prevState,
            image,
          }));
          break;
        }
        i -= 1;
      }
    });
  };

  useEffect(() => {
    let i = 0;
    let totalCalories = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    let totalProtein = 0;
    while (i < items.length) {
      totalCalories += items[i].calories;
      totalCarbs += items[i].carbs;
      totalFat += items[i].fat;
      totalProtein += items[i].protein;
      i++;
    }
    setList((prevState) => ({
      ...prevState,
      calories: totalCalories,
      carbs: totalCarbs,
      fat: totalFat,
      protein: totalProtein,
    }));
  }, [items]);

  useEffect(() => {
    if (list !== []) {
      const API_URL = "/api/lists/" + list._id;
      const config = {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      };
      axios.put(API_URL, list, config);
    }
  }, [list, userData.token]);

  const addItem = async () => {
    if (autoFill) {
      const API_URL = "/api/items/" + params.id;
      const API_URL2 =
        "https://api.spoonacular.com/recipes/complexSearch?query=" +
        input +
        "&number=1&apiKey=922cee6111af498583d623a63f4d5734";
      const config = {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      };
      axios
        .get(API_URL2)
        .then((res) => {
          const API_URL3 =
            "https://api.spoonacular.com/recipes/" +
            res.data["results"][0].id +
            "/nutritionWidget.json?apiKey=922cee6111af498583d623a63f4d5734";
          axios
            .get(API_URL3)
            .then((response) => {
              const itemData = {
                name: input,
                calories: Math.round(parseInt(response.data.calories)),
                carbs: Math.round(parseInt(response.data.carbs)),
                fat: Math.round(parseInt(response.data.fat)),
                protein: Math.round(parseInt(response.data.protein)),
                image: res.data["results"][0].image,
              };
              axios.post(API_URL, itemData, config).then(() => {
                updateItems();
              });
            })
            .catch(() => {
              const itemData = {
                name: input,
              };
              axios.post(API_URL, itemData, config).then(() => {
                updateItems();
              });
            });
        })
        .catch(() => {
          const itemData = {
            name: input,
          };
          axios.post(API_URL, itemData, config).then(() => {
            updateItems();
          });
        });
    } else {
      const API_URL = "/api/items/" + params.id;
      const config = {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      };
      const itemData = {
        name: input,
      };
      axios.post(API_URL, itemData, config).then(() => {
        updateItems();
      });
    }
  };

  const dateFormat = (date) => {
    let formatting = new Date(date);
    let format = formatting.toLocaleString([], {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return format.replace(",", "");
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
          <Typography variant="h6" align="center" color="textPrimary" paragraph>
            {dateFormat(list.date)}
          </Typography>
          <Box align="center" sx={{ display: "block", marginBottom: "25px" }}>
            <Typography>
              Total ~ Calories: {list.calories} • Carbs: {list.carbs}g • Fat:{" "}
              {list.fat}g • Protein: {list.protein}g
            </Typography>
          </Box>
          <Box align="center" sx={{ display: "block", marginBottom: "20px" }}>
            <TextField
              align="center"
              label="Add a food or dish"
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
            <Button
              onClick={() => setAutoFill(!autoFill)}
              variant="outlined"
              sx={{
                marginLeft: "10px",
                height: "55px",
                width: "50px",
                fontSize: "12px",
              }}
            >
              AutoFill: {autoFill ? "on" : "off"}
            </Button>
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
