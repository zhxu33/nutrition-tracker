const express = require("express");
const router = express.Router();
const {
  getItems,
  setItem,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");

const { protect } = require("../middleware/authMiddleware");

router.route("/:id").get(protect, getItems).post(protect, setItem);

router
  .route("/:listid/:id")
  .delete(protect, deleteItem)
  .put(protect, updateItem);

module.exports = router;
