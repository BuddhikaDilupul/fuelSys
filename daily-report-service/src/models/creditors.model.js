const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const creditorsSchema = new Schema({
  creditorData: [
    {
      creditorId: {
        type: Number,
        required: true,
      },
      creditorName: {
        type: Number,
        required: true,
      },
      fuelType: {
        type: Number,
        required: true,
      },
      fuelPrice: {
        type: Number,
        required: true,
      },
      fuelAmount: {
        type: Number,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  totalAmount: {
    type: Number,
    required: true,
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
  staus: {
    type: String,
    enum: ["pending", "approved", "submitted", "rejected"],
    default: "pending",
  },
});

module.exports = mongoose.model("Creditors", creditorsSchema);
