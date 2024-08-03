const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const atmSchema = new Schema({
  totalAmount: {
    type: Number,
    required: true,
  },
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
  billdata: [
    {
      billNumber: {
        type: String,
        required: true,
      },
      cardType: {
        type: String,
        required: true,
      },
      Amount:{
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
  
});

module.exports = mongoose.model("ATM", atmSchema);