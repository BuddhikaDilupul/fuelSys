const Creditors = require("../models/creditors.model");
const httpStatus = require("http-status");

// Create a new Creditors record
exports.createCreditors = async (req, res) => {
  try {
    const { creditorData, createdBy } = req.body;

    // Calculate totalAmount
    const totalAmount = creditorData.reduce(
      (total, creditor) => total + creditor.amount,
      0
    );

    const newCreditors = new Creditors({
      creditorData,
      totalAmount,
      createdBy,
    });

    await newCreditors.save();
    res.status(httpStatus.CREATED).json(newCreditors);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ error: error.message });
  }
};

// Get a Creditors record by ID
exports.getCreditorsById = async (req, res) => {
  try {
    const creditors = await Creditors.findById(req.params.id);
    if (!creditors) {
      return res.status(404).json({ message: "Creditors record not found" });
    }
    res.json(creditors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCreditorsByPumperId = async (req, res) => {
  try {
    let totalAmount = 0;
    // Extract pumperId and fuelType from request parameters or query
    const { id: pumperId } = req.params;

    // Find the creditors record by pumperId
    const report = await Creditors.find({
      "createdBy.pumperId": pumperId,
    });
    console.log(report);
    report.map((data) => {
      console.log(data.totalAmount);

      totalAmount += data.totalAmount;
    });
    // Check if the creditors record is found
    if (!report) {
      return res.status(404).json({ message: "Creditors record not found" });
    }

    res.json({ report, totalAmount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Creditors records
exports.getAllCreditors = async (req, res) => {
  try {
    const creditors = await Creditors.find();
    res.json(creditors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Creditors record by ID
exports.updateCreditorsById = async (req, res) => {
  const { itemId, status } = req.body;
  const reportId = req.params.id;

  try {
    const prevData = await Creditors.findOne({
      _id: reportId,
      "creditorData._id": itemId,
    });
    let missMatched = 0;
    if (status === "rejected") {
      missMatched = prevData.creditorData[0].amount;
    }
    if (!prevData) {
      return res.status(404).json({ message: "Report not found" });
    }

    let fuelSummery = prevData.fuelSummery || [];

    let temp = {
      fuelType: prevData.creditorData[0].fuelType,
      totalAmount: prevData.creditorData[0].fuelAmount,
      totalPrice:
        prevData.creditorData[0].fuelAmount *
        prevData.creditorData[0].fuelPrice,
    };

    let fuelTypeExists = false;

    fuelSummery?.map((data, index) => {
      if (data.fuelType === temp.fuelType) {
        fuelSummery[index].totalAmount += temp.totalAmount;
        fuelSummery[index].totalPrice += temp.totalPrice;
        fuelTypeExists = true;
      }
    });
    if (!fuelTypeExists) {
      fuelSummery.push(temp);
    }

    const updatedData = await Creditors.findOneAndUpdate(
      { _id: reportId, "creditorData._id": itemId },
      {
        $set: {
          "creditorData.$.status": status,
        },
        $inc: { totalAmount: -missMatched },
        fuelSummery: fuelSummery,
      },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).json({ message: "Record or bill not found" });
    }

    res.json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Creditors record by ID
exports.deleteCreditorsById = async (req, res) => {
  try {
    const creditors = await Creditors.findByIdAndDelete(req.params.id);
    if (!creditors) {
      return res.status(404).json({ message: "Creditors record not found" });
    }
    res.json({ message: "Creditors record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
