const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cashSchema = new Schema({
  cashList: [
    {
      amount: {
        type: Number,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    pumperId: {
      type: String,
      required: true,
    },
    pumperName: {
      type: String,
      required: true,
    },
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

module.exports = mongoose.model("Cash", cashSchema);
