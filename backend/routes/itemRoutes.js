const express = require("express");
const router = express.Router();
const {
  getItems,
  setItem,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");

router.route("/:id").get(getItems).post(setItem);

router.route("/:id").delete(deleteItem).put(updateItem);

module.exports = router;
