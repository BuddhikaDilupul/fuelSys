const httpStatus = require("http-status");
const Cash = require("../models/cash.model");

// Create a new Cash record
exports.createCash = async (req, res) => {
  try {
    const { cashList, createdBy } = req.body;

    const newCash = new Cash({
      cashList,
      createdBy,
    });

    await newCash.save();
    res.status(201).json(newCash);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a Cash record by ID
exports.getCashById = async (req, res) => {
  try {
    const cash = await Cash.findById(req.params.id);
    if (!cash) {
      return res.status(404).json({ message: "Cash record not found" });
    }
    res.json(cash);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all records created by a specific pumper
exports.getRecordsByPumperId = async (req, res, next) => {
  try {
    const pumperId = req.params.id;
    const records = await Cash.find({ "createdBy.pumperId": pumperId });
    let totalAmount = 0;

    const calculateTotalAmounts = (cashRecords) => {
      // Initialize a variable to hold the total amount

      // Iterate through each cash record
      cashRecords.forEach((record) => {
        // Iterate through each amount in the cashList of the current record
        record.cashList.forEach((cash) => {
          // Add the amount to the totalAmount
          totalAmount += cash.amount;
        });
      });

      // Return the total amount
      return totalAmount;
    };
    let totalFinalAmount = calculateTotalAmounts(records);
    if (records && records.length > 0) {
      return res
        .status(httpStatus.OK)
        .send({ records, totalFinalAmount: totalFinalAmount });
    }

    return res
      .status(httpStatus.NOT_FOUND)
      .send("No records found for this pumper");
  } catch (error) {
    next(error);
  }
};

// Get all Cash records
exports.getAllCash = async (req, res) => {
  try {
    const cashRecords = await Cash.find();
    res.json(cashRecords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Cash record by ID
exports.updateCashById = async (req, res) => {
  try {
    const { amount, createdBy, status } = req.body;

    const cash = await Cash.findById(req.params.id);
    if (!cash) {
      return res.status(404).json({ message: "Cash record not found" });
    }

    if (amount !== undefined) cash.amount = amount;
    if (createdBy !== undefined) cash.createdBy = createdBy;
    if (status !== undefined) cash.status = status;

    await cash.save();
    res.json(cash);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Update a Cash record status by ID
exports.updateCashStatusById = async (req, res) => {
  try {
    const id = req.params.id;

    const cash = await Cash.findByIdAndUpdate(id, {
      status: req.body.status,
      updatedAt: Date.now(),
    });
    if (!cash) {
      return res.status(404).json({ message: "Cash record not found" });
    }
    await cash.save();
    res.json(cash);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Cash record by ID
exports.deleteCashById = async (req, res) => {
  try {
    const cash = await Cash.findByIdAndDelete(req.params.id);
    if (!cash) {
      return res.status(404).json({ message: "Cash record not found" });
    }
    res.json({ message: "Cash record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
