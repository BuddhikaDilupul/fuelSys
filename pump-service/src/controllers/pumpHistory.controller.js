const PumpHistory = require("../models/history.model");
const Pump = require("../models/pump.model");

exports.createPumpHistory = async (req, res) => {
  const { pumpId, pumperName, fuel, manual, digital, testing } = req.body;

  try {
    const newPumpHistory = new PumpHistory({
      pumpId,
      pumperName,
      fuel,
      manual,
      digital,
      testing,
      status: "in_progress",
    });
    await Pump.findByIdAndUpdate(
      pumpId,
      { status: "in_use" },
      { new: true }
    );
    const savedPumpHistory = await newPumpHistory.save();
    res.status(201).json(savedPumpHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePumpHistoryStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (
    !["closed_complete", "closed_incomplete"].includes(status)
  ) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  try {
    const updatedPumpHistory = await PumpHistory.findByIdAndUpdate(
      id,
      { status, updatedAt: Date.now() },
      { new: true }
    );
    await Pump.findByIdAndUpdate(
        id,
        { status: "idle" },
        { new: true }
      );
    if (!updatedPumpHistory) {
      return res.status(404).json({ error: "PumpHistory record not found" });
    }

    res.status(200).json(updatedPumpHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
