const httpStatus = require("http-status");
const ATM = require("../models/atm.model");

// Create a new ATM record
exports.createATM = async (req, res) => {
  try {
    const { createdBy, billdata } = req.body;

    // Calculate the totalAmount by summing up the 'Amount' field in the billdata array
    const totalAmount = billdata.reduce(
      (total, bill) => total + bill.amount,
      0
    );

    const newATM = new ATM({
      totalAmount,
      createdBy,
      billdata,
    });

    await newATM.save();
    res.status(201).json(newATM);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Get an ATM record by ID
exports.getATMById = async (req, res) => {
  try {
    const atm = await ATM.findById(req.params.id);
    if (!atm) {
      return res.status(404).json({ message: "ATM record not found" });
    }
    res.json(atm);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all ATM records
exports.getAllATMs = async (req, res) => {
  try {
    const atms = await ATM.find();
    res.json(atms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPumperReport = async (req, res) => {
  try {
    const pumperId = req.params.id;

    // Find all ATM records created by the specific pumper
    const atmRecords = await ATM.find({ "createdBy.pumperId": pumperId });

    if (atmRecords.length === 0) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "No records found for this pumper." });
    }

    // // Generate a report
    const totalAmount = atmRecords.reduce(
      (total, record) => total + record.totalAmount,
      0
    );
    const report = {
      pumperId,
      pumperName: atmRecords[0].createdBy.pumperName,
      totalAmount,
      atmRecords,
    };

    return res.status(httpStatus.OK).json(report);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

// Update an ATM record by ID
exports.updateATMById = async (req, res) => {
  try {
    const { totalAmount, createdBy, billdata, status } = req.body;

    const atm = await ATM.findById(req.params.id);
    if (!atm) {
      return res.status(404).json({ message: "ATM record not found" });
    }

    if (totalAmount !== undefined) atm.totalAmount = totalAmount;
    if (createdBy !== undefined) atm.createdBy = createdBy;
    if (billdata !== undefined) atm.billdata = billdata;
    if (status !== undefined) atm.status = status;

    await atm.save();
    res.json(atm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update status of a specific bill
exports.updateBillStatus = async (req, res) => {
  const { itemId, status } = req.body;
  const reportId = req.params.id;

  try {
    const prevATM = await ATM.findOne(
      { _id: reportId, "billdata._id": itemId },
      { "billdata.$": 1 }
    );
    let missMatched = 0;
    if (status === "rejected") {
      missMatched = prevATM.billdata[0].amount;
    }
    const updatedATM = await ATM.findOneAndUpdate(
      { _id: reportId, "billdata._id": itemId }, // Filter criteria
      {
        $set: { "billdata.$.status": status },
        $inc: { totalAmount: -missMatched },
      }, // Update operation
      { new: true } // Return the updated document
    );

    if (!updatedATM) {
      return res.status(404).json({ message: "ATM record or bill not found" });
    }

    res.json(updatedATM);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an ATM record by ID
exports.deleteATMById = async (req, res) => {
  try {
    const atm = await ATM.findByIdAndDelete(req.params.id);
    if (!atm) {
      return res.status(404).json({ message: "ATM record not found" });
    }
    res.json({ message: "ATM record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
