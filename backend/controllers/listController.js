const asyncHandler = require("express-async-handler");

const List = require("../models/listModel");

// @desc    Get lists
// @route   GET /api/lists
// @access  Private
const getLists = asyncHandler(async (req, res) => {
  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  const lists = await List.find({ user: req.user.id });

  res.status(200).json(lists);
});

// @desc    Set lists
// @route   POST /api/lists
// @access  Private
const setList = asyncHandler(async (req, res) => {
  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  const list = await List.create({
    name: req.body.name,
    date: req.body.date,
    calories: req.body.calories,
    carbs: req.body.carbs,
    fat: req.body.fat,
    protein: req.body.protein,
    user: req.user.id,
  });

  res.status(200).json(list);
});

// @desc    Update lists
// @route   PUT /api/lists
// @access  Private
const updateList = asyncHandler(async (req, res) => {
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

  List.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      date: req.body.date,
      calories: req.body.calories,
      carbs: req.body.carbs,
      fat: req.body.fat,
      protein: req.body.protein,
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

// @desc    Delete list
// @route   Delete /api/lists
// @access  Private
const deleteList = asyncHandler(async (req, res) => {
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

  await list.remove();
  res.status(200).json({ id: req.params.id });
});

// @desc    Get list
// @route   GET /api/lists
// @access  Private
const getList = asyncHandler(async (req, res) => {
  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  const list = await List.findById(req.params.id);

  if (!list) {
    res.status(400);
    throw new Error("List not found");
  }

  res.status(200).json(list);
});

module.exports = {
  getLists,
  setList,
  updateList,
  deleteList,
  getList,
};
