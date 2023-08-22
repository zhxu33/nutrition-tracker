import { useState } from "react";
import {
  Typography,
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Input,
  TextField,
  CardMedia,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";

function Item({ item, userData, updateItems }) {
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    name: item.name,
    calories: item.calories,
    carbs: item.carbs,
    fat: item.fat,
    protein: item.protein,
    image: item.image,
  });

  const { name, calories, carbs, fat, protein, image } = formData;

  const editClicked = () => {
    setEdit(!edit);
    if (edit === true) {
      const API_URL = "/api/items/" + item.list.toString() + "/" + item._id;
      const config = {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      };
      const itemData = {
        name: name,
        calories: calories,
        carbs: carbs,
        fat: fat,
        protein: protein,
      };
      axios.put(API_URL, itemData, config).then((response) => {
        console.log(response.data);
        updateItems();
      });
    }
  };

  const deleteClicked = () => {
    const API_URL = "/api/items/" + item.list.toString() + "/" + item._id;
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };
    axios.delete(API_URL, config).then((response) => {
      console.log(response.data);
      updateItems();
    });
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      {edit ? (
        <Accordion>
          <AccordionSummary
            id="panel1-header"
            aria-controls="panel1-content"
            expandIcon={<ExpandMoreIcon />}
            sx={{ justifyContent: "center" }}
          >
            <Typography noWrap>{name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Input
              placeholder="Name"
              type="text"
              name="name"
              onChange={onChange}
              value={name}
              sx={{
                width: "250px",
                marginBottom: "10px",
                fontSize: "16px",
                display: "block",
              }}
            />
            {image !== "" ? (
              <CardMedia
                sx={{
                  paddingTop: "56.25%",
                  marginBottom: "20px",
                }}
                image={image}
                title="Image title"
              />
            ) : (
              <></>
            )}
            <TextField
              required
              placeholder="Calories"
              helperText="Calories"
              type="number"
              name="calories"
              onChange={onChange}
              value={calories}
              sx={{
                width: "80px",
                marginTop: "-3.2px",
                marginBottom: "2.5px",
                fontSize: "16px",
              }}
            />
            <TextField
              placeholder="Carbs"
              helperText="Carbs"
              type="number"
              name="carbs"
              onChange={onChange}
              value={carbs}
              sx={{
                width: "80px",
                marginTop: "-3.2px",
                marginBottom: "2.5px",
                fontSize: "16px",
                marginLeft: "15px",
              }}
            />
            <TextField
              placeholder="Fat"
              helperText="Fat"
              type="number"
              name="fat"
              onChange={onChange}
              value={fat}
              sx={{
                width: "80px",
                marginTop: "-3.2px",
                marginBottom: "2.5px",
                fontSize: "16px",
                marginLeft: "15px",
              }}
            />
            <TextField
              placeholder="Protein"
              helperText="Protein"
              type="number"
              name="protein"
              onChange={onChange}
              value={protein}
              sx={{
                width: "80px",
                marginTop: "-3.2px",
                marginBottom: "2.5px",
                fontSize: "16px",
                marginLeft: "15px",
              }}
            />
          </AccordionDetails>
          <AccordionActions>
            <Button onClick={deleteClicked}>Delete</Button>
            <Button onClick={editClicked}>Submit</Button>
          </AccordionActions>
        </Accordion>
      ) : (
        <Accordion>
          <AccordionSummary
            id="panel1-header"
            aria-controls="panel1-content"
            expandIcon={<ExpandMoreIcon />}
            sx={{ justifyContent: "center" }}
          >
            <Typography>{name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {image !== "" ? (
              <CardMedia
                sx={{
                  paddingTop: "56.25%",
                  marginBottom: "20px",
                }}
                image={image}
                title="Image title"
              />
            ) : (
              <></>
            )}
            <Typography noWrap sx={{ fontSize: "16px" }}>
              ~ Calories: {calories} • Carbs: {carbs}g • Fat: {fat}g • Protein:{" "}
              {protein}g
            </Typography>
          </AccordionDetails>
          <AccordionActions>
            <Button onClick={deleteClicked}>Delete</Button>
            <Button onClick={editClicked}>Edit</Button>
          </AccordionActions>
        </Accordion>
      )}
    </>
  );
}

export default Item;
