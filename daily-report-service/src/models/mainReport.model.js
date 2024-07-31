const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema({
  data: [
    {
      pumpData: {
        pumpId: {
          type: String,
          required: true,
        },
        pumpName: {
          type: String,
          required: true,
        },
      },
      fuelData: {
        fuelId: {
          type: String,
          required: true,
        },
        fuelName: {
          type: String,
          required: true,
        },
      },
      price: {
        priceId: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
      manualMeter: {
        open: {
          type: Number,
          required: true,
        },
        closed: {
          type: Number,
          required: true,
        },
      },
      digitalMeter: {
        open: {
          type: Number,
          required: true,
        },
        closed: {
          type: Number,
          required: true,
        },
      },
      testUsage: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  totalFuel: {
    type: Number,
    required: true,
  },
  itemList: [
    {
      reportId: {
        type: Schema.Types.ObjectId,
        refPath: "itemType",
      },
      itemType: {
        type: String,
        required: true,
        enum: ["Cash", "ATM", "Creditors"],
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    username: {
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

module.exports = mongoose.model("Report", reportSchema);
