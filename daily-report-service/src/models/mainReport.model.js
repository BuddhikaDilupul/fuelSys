const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema({
  pumpDetails: [
    {
      pumpId:{
        type: String,
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
      totalEarnPriceFromPump: {
        type: Number,
      },
      totalDistributedFuelFromPump: {
        type: Number,
      },
    },
  ],

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
  reportId: {
    type: String,
    unique: true,
  },
});

// Pre-save middleware to generate custom report ID
reportSchema.pre("save", async function (next) {
  const report = this;

  if (!report.isNew) {
    return next();
  }

  // Get current date in yyyy-mm-dd format
  const currentDate = new Date().toISOString().slice(0, 10);

  // Count the number of reports created today
  const count = await mongoose.model("Report").countDocuments({
    reportId: { $regex: `^${currentDate}` },
  });

  // Generate the custom ID
  const sequentialNumber = (count + 1).toString().padStart(6, "0");
  report.reportId = `${currentDate}-${sequentialNumber}`;

  next();
});

module.exports = mongoose.model("Report", reportSchema);
