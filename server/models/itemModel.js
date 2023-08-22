const mongoose = require("mongoose");

const itemSchema = mongoose.Schema(
  {
    list: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "List",
    },
    name: {
      type: String,
      require: [true, "Please add a name value"],
    },
    calories: {
      type: Number,
      default: 0,
    },
    carbs: {
      type: Number,
      default: 0,
    },
    fat: {
      type: Number,
      default: 0,
    },
    protein: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Item", itemSchema);
