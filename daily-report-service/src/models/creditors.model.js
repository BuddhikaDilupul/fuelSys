const { required } = require("joi");
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
        type: String,
        required: true,
      },
      billNumber: {
        type: String,
        unique: true,
        required: true,
      },
      fuelType: {
        type: String,
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
  fuelSummery: {
    fuelType: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
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
    enum: ["pending", "approved", "submitted", "rejected"],
    default: "pending",
  },
});

module.exports = mongoose.model("Creditors", creditorsSchema);
