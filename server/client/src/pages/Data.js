import { useState, useEffect } from "react";
import axios from "axios";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Container,
  Typography,
  Input,
  Box,
} from "@mui/material";
import useStyles from "../styles/style";

function Data() {
  const [lists, setLists] = useState([]);
  const [chart, setChart] = useState(1);
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const classes = useStyles();

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

  const [listData, setListData] = useState({
    label: lists.map((list) => list.date),
    datasets: [
      {
        label: "Calories Trend",
        data: lists.map((list) => list.calories),
      },
    ],
  });

  const [pieData, setPieData] = useState({
    label: lists.map((list) => list.date),
    datasets: [
      {
        label: "Data",
        data: lists.map((list) => list.calories),
      },
    ],
  });

  const dateFormat = (date) => {
    let formatting = new Date(date);
    formatting = formatting.toLocaleString([], {
      timeZone: "UTC",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formatting.replace(",", "");
  };

  const inputDateFormat = (date) => {
    let format = dateFormat(date);
    format =
      format.substr(6, 4) +
      "-" +
      format.substr(0, 2) +
      "-" +
      format.substr(3, 2);
    return format;
  };

  useEffect(() => {
    let sortedLists = lists;
    sortedLists.sort((a, b) => {
      let date = new Date(a.date);
      let date2 = new Date(b.date);
      return date > date2 ? 1 : -1;
    });
    let i = 1;
    while (i < sortedLists.length) {
      let date1 = new Date(sortedLists[i].date);
      let date2 = new Date(sortedLists[i - 1].date);
      if (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      ) {
        sortedLists[i].calories += sortedLists[i - 1].calories;
        sortedLists[i].carbs += sortedLists[i - 1].carbs;
        sortedLists[i].fat += sortedLists[i - 1].fat;
        sortedLists[i].protein += sortedLists[i - 1].protein;
        sortedLists.splice(i - 1, 1);
      } else {
        i += 1;
      }
    }
    if (minDate === "" || maxDate === "") {
      if (minDate === "" && sortedLists.length > 1) {
        setMinDate(sortedLists[0].date);
      }
      if (maxDate === "" && sortedLists.length > 2) {
        setMaxDate(sortedLists[sortedLists.length - 1].date);
      }
    } else {
      sortedLists = sortedLists.filter((list) => {
        let a = new Date(list.date);
        let b = new Date(minDate);
        let c = new Date(maxDate);
        return a >= b && a <= c;
      });
    }
    setListData({
      labels: sortedLists.map((list, index) => {
        if (index === 0 || index === sortedLists.length - 1) {
          return dateFormat(list.date);
        } else {
          return " ";
        }
      }),
      datasets: [
        {
          label: "Calories",
          data: sortedLists.map((list) => list.calories),
        },
        {
          label: "Carbs",
          hidden: true,
          data: sortedLists.map((list) => list.carbs),
        },
        {
          label: "Fat",
          hidden: true,
          data: sortedLists.map((list) => list.fat),
        },
        {
          label: "Protein",
          hidden: true,
          data: sortedLists.map((list) => list.protein),
        },
      ],
    });
    i = 0;
    let output = [0, 0, 0];
    while (i < sortedLists.length) {
      output[0] += sortedLists[i].carbs;
      output[1] += sortedLists[i].fat;
      output[2] += sortedLists[i].protein;
      i += 1;
    }
    setPieData({
      labels: ["Carbs", "Fat", "Protein"],
      datasets: [
        {
          data: output,
        },
      ],
    });
  }, [lists, minDate, maxDate]);

  return (
    <main>
      <div className={classes.container}>
        <Container maxWidth="sm">
          <Typography align="center" variant="h4">
            Nutrition Data
          </Typography>
        </Container>
      </div>
      <div className={classes.button}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Typography variant="h5">Start Date: </Typography>
          </Grid>
          <Grid item>
            <Input
              type="date"
              name="minDate"
              value={inputDateFormat(minDate)}
              onChange={(e) => setMinDate(e.target.value)}
              sx={{
                width: "150px",
                fontSize: "16px",
              }}
            />
          </Grid>
          <Grid item>
            <Typography variant="h5">End Date: </Typography>
          </Grid>
          <Grid item>
            <Input
              type="date"
              name="maxDate"
              value={inputDateFormat(maxDate)}
              onChange={(e) => setMaxDate(e.target.value)}
              sx={{
                width: "150px",
                fontSize: "16px",
              }}
            />
          </Grid>
          <Grid item>
            <FormControl
              sx={{
                width: "200px",
              }}
            >
              <InputLabel size="small" id="demo-simple-select-label">
                Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Type"
                size="small"
                onChange={(e) => setChart(e.target.value)}
                value={chart}
              >
                <MenuItem value={1}>Line Chart</MenuItem>
                <MenuItem value={2}>Bar Chart</MenuItem>
                <MenuItem value={3}>Pie Chart</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </div>
      {chart === 1 ? (
        <Box sx={{ maxWidth: "750px", margin: "10px auto" }}>
          <LineChart chartData={listData} />
        </Box>
      ) : (
        <></>
      )}
      {chart === 2 ? (
        <Box sx={{ maxWidth: "750px", margin: "10px auto" }}>
          <BarChart chartData={listData} />
        </Box>
      ) : (
        <></>
      )}
      {chart === 3 ? (
        <Box sx={{ maxWidth: "300px", margin: "10px auto" }}>
          <PieChart chartData={pieData} />
        </Box>
      ) : (
        <></>
      )}
    </main>
  );
}

export default Data;
