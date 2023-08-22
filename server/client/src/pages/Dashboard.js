import { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Container,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import useStyles from "../styles/style";
import axios from "axios";
import List from "../components/List";

function Dashboard() {
  const classes = useStyles();

  const [lists, setLists] = useState([]);
  const [sort, setSort] = useState(1);

  let userData;

  if (!localStorage.getItem("user")) {
    window.location.replace("/login");
  } else {
    userData = JSON.parse(localStorage.getItem("user"));
  }

  useEffect(() => {
    const API_URL = "/api/lists";
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };
    axios
      .get(API_URL, config)
      .then((response) => {
        setLists(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userData.token]);

  const updateLists = (image) => {
    const API_URL = "/api/lists";
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };
    axios.get(API_URL, config).then((response) => {
      setLists(response.data);
    });
  };

  const addList = async () => {
    const API_URL = "/api/lists";
    const API_URL2 =
      "https://api.spoonacular.com/recipes/random?number=1&apiKey=922cee6111af498583d623a63f4d5734";
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };
    let image;
    try {
      const res = await axios.get(API_URL2);
      if (res.data) {
        image = res.data.recipes[0].image;
        console.log(image);
      }
    } catch (err) {
      console.log(err);
    }
    const listData = {
      name: "Meal",
      image: image,
    };
    axios.post(API_URL, listData, config).then(() => {
      updateLists();
    });
  };

  const dataClicked = () => {
    window.location.replace("/data");
  };

  const handleChange = (e) => {
    setSort(e.target.value);
  };

  let sortedLists = [...lists];
  if (sort === 1) {
    sortedLists = sortedLists.slice().reverse();
  } else if (sort === 3) {
    sortedLists.sort((a, b) => {
      let date = new Date(a.date);
      let date2 = new Date(b.date);
      return date > date2 ? 1 : -1;
    });
  } else if (sort === 4) {
    sortedLists.sort((a, b) => {
      let date = new Date(a.date);
      let date2 = new Date(b.date);
      return date < date2 ? 1 : -1;
    });
  }

  return (
    <main>
      <div className={classes.container}>
        <Container maxWidth="sm">
          <Typography align="center" variant="h4">
            Welcome, {userData.firstname}!
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary">
            Start tracking your meals and nutrition data
          </Typography>
        </Container>
      </div>
      <div className={classes.button}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button onClick={addList} variant="contained">
              Add Meal
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="primary" onClick={dataClicked}>
              View Nutrition Data
            </Button>
          </Grid>
          <Grid item>
            <FormControl
              sx={{
                width: "200px",
              }}
            >
              <InputLabel size="small" id="demo-simple-select-label">
                Sort
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Sort"
                size="small"
                onChange={handleChange}
                value={sort}
              >
                <MenuItem value={1}>Newest</MenuItem>
                <MenuItem value={2}>Oldest</MenuItem>
                <MenuItem value={3}>Date Ascending</MenuItem>
                <MenuItem value={4}>Date Descending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </div>
      <Container className={classes.cardGrid} maxWidth="mid">
        <Grid container spacing={4}>
          {sortedLists.map((list) => (
            <List
              key={list._id}
              list={list}
              userData={userData}
              updateLists={updateLists}
            />
          ))}
        </Grid>
      </Container>
    </main>
  );
}

export default Dashboard;
