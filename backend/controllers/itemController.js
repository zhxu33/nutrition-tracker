const asyncHandler = require("express-async-handler");

const Item = require("../models/itemModel");

// @desc    Get items
// @route   GET /api/items
// @access  Private
const getItems = asyncHandler(async (req, res) => {
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

  const item = await Item.create({
    name: req.body.name,
    list: req.params.id,
  });

  res.status(200).json(item);
});

// @desc    Update item
// @route   PUT /api/items
// @access  Private
const updateItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(400);
    throw new Error("Item not found");
  }

  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a name field");
  }

  Item.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
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
