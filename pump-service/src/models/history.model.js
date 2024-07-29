const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pumpHistorySchema = new Schema({
  pumpId: {
    type: Schema.Types.ObjectId,
    ref: "Pump",
    required: true,
  },
  pumperName: {
    type: String,
    required: true,
  },
  fuel: {
    type: Schema.Types.ObjectId,
    ref: "Fuel",
    required: true,
  },
  manual: {
    open: {
      type: Number,
      required: true,
    },
    close: {
      type: Number,
      required: true,
    },
  },
  digital: {
    open: {
      type: Number,
      required: true,
    },
    close: {
      type: Number,
      required: true,
    },
  },
  testing: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["in_progress", "closed_complete", "closed_incomplete"],
    default: "idle",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  },
});

module.exports = mongoose.model("PumpHistory", pumpHistorySchema);
