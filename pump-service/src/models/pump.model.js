const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pumpSchema = new Schema({
  pumpName: {
    type: String,
    required: true,
    unique: true,
  },
  fuel: {
    type: Schema.Types.ObjectId,
    ref: "Fuel",
    required: true,
  },
  manual: {
    type: Number,
    required: true,
  },
  digital: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "idle",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Pump", pumpSchema);
