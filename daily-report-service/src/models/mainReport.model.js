const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const reportSchema = new Schema({
  data: [
    {
      pumpData: {
        pumpId: {
          type: String,
        },
        pumpName: {
          type: String,
        },
      },
      fuelData: {
        fuelId: {
          type: String,
        },
        fuelName: {
          type: String,
        },
      },
      price: {
        priceId: {
          type: String,
        },
        price: {
          type: Number,
        },
      },
      manualMeter: {
        open: {
          type: Number,
        },
        closed: {
          type: Number,
        },
      },
      digitalMeter: {
        open: {
          type: Number,
        },
        closed: {
          type: Number,
        },
      },
      testUsage: {
        type: Number,
      },
    },
  ],
  totalPrice: {
    type: Number,
  },
  totalFuel: {
    type: Number,
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
  assignedTo: {
    username: {
      type: String,
      required: true,
    },
  },
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
