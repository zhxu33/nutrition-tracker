import React from "react";
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Container,
  CardActions,
} from "@mui/material";
import useStyles from "../styles/style";

function Dashboard() {
  const classes = useStyles();

  const cards = [1, 2, 3, 4, 5, 6];

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
            Welcome
          </Typography>
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="mid">
        <Grid container spacing={4}>
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5">
                    Nutrition List Name
                  </Typography>
                  <Typography>
                    This is the description of your nutrition list.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    View
                  </Button>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box textAlign="center">
        <Button variant="contained">Add Nutrition List</Button>
      </Box>
    </main>
  );
}

export default Dashboard;
