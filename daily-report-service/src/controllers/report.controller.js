const Report = require('../models/mainReport.model'); // Adjust path as needed
const Cash = require('../models/cash.model');     // Adjust path as needed
const ATM = require('../models/atm.model');       // Adjust path as needed
const Creditors = require('../models/creditors.model'); // Adjust path as needed

exports.createReport = async (req, res) => {
  try {
    const { itemList, createdBy, status } = req.body;

    // Create a new Report instance
    const newReport = new Report({
      itemList,
      createdBy,
      status,
      assignedTo
    });

    // Save the report
    const savedReport = await newReport.save();

  res.status(201).json(savedReport);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a Report by ID
exports.getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate('itemList.reportId');  // Populate referenced documents
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Reports
exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().populate('itemList.reportId');  // Populate referenced documents
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Report by ID
exports.updateReportById = async (req, res) => {
  try {
    const {
      data,
      totalPrice,
      totalFuel,
      itemList,
      createdBy,
      status,
    } = req.body;

    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    if (data !== undefined) report.data = data;
    if (totalPrice !== undefined) report.totalPrice = totalPrice;
    if (totalFuel !== undefined) report.totalFuel = totalFuel;
    if (itemList !== undefined) report.itemList = itemList;
    if (createdBy !== undefined) report.createdBy = createdBy;
    if (status !== undefined) report.status = status;

    await report.save();
    res.json(report);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Report by ID
exports.deleteReportById = async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
