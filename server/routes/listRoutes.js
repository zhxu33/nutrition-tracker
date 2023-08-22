const express = require("express");
const router = express.Router();
const {
  getLists,
  setList,
  updateList,
  deleteList,
  getList,
} = require("../controllers/listController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getLists).post(protect, setList);

router
  .route("/:id")
  .delete(protect, deleteList)
  .put(protect, updateList)
  .get(protect, getList);

module.exports = router;
