const mongoose = require("mongoose");

const defaultDate = () => {
  let formatting = new Date();
  let format = formatting.toLocaleString([], {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return format.replace(",", "");
};

const listSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      default: "Meal Plan",
    },
    date: {
      type: String,
      default: defaultDate,
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("List", listSchema);
