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
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Item", itemSchema);
