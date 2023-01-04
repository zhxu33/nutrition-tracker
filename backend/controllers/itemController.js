const asyncHandler = require("express-async-handler");

const Item = require("../models/itemModel");
const List = require("../models/listModel");

// @desc    Get items
// @route   GET /api/items
// @access  Private
const getItems = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  if (!list) {
    res.status(400);
    throw new Error("List not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the list user
  if (list.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const items = await Item.find({ list: req.params.id });

  res.status(200).json(items);
});

// @desc    Set item
// @route   POST /api/items
// @access  Private
const setItem = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a name field");
  }

  const list = await List.findById(req.params.id);

  if (!list) {
    res.status(400);
    throw new Error("List not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the list user
  if (list.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const item = await Item.create({
    name: req.body.name,
    calories: req.body.calories,
    carbs: req.body.carbs,
    fat: req.body.fat,
    protein: req.body.protein,
    image: req.body.image,
    list: req.params.id,
  });

  res.status(200).json(item);
});

// @desc    Update item
// @route   PUT /api/items
// @access  Private
const updateItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  const list = await List.findById(req.params.listid);

  if (!list) {
    res.status(400);
    throw new Error("List not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the list user
  if (list.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  if (!item) {
    res.status(400);
    throw new Error("Item not found");
  }

  if (list._id.toString() !== item.list.toString()) {
    res.status(401);
    throw new Error("Item not authorized");
  }

  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a name field");
  }

  Item.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      calories: req.body.calories,
      carbs: req.body.carbs,
      fat: req.body.fat,
      protein: req.body.protein,
      image: req.body.image,
    },
    function (err) {
      if (err) {
        res.status(401);
        throw new Error(err);
      } else {
        res.status(200).json({ id: req.params.id });
      }
    }
  );
});

// @desc    Delete items
// @route   Delete /api/items
// @access  Private
const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  const list = await List.findById(req.params.listid);

  if (!list) {
    res.status(400);
    throw new Error("List not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the list user
  if (list.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  if (list._id.toString() !== item.list.toString()) {
    res.status(401);
    throw new Error("Item not authorized");
  }

  if (!item) {
    res.status(400);
    throw new Error("Item not found");
  }

  await item.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getItems,
  setItem,
  updateItem,
  deleteItem,
};
