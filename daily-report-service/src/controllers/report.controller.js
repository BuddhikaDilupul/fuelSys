const Report = require("../models/mainReport.model"); // Adjust path as needed
const Cash = require("../models/cash.model"); // Adjust path as needed
const ATM = require("../models/atm.model"); // Adjust path as needed
const Creditors = require("../models/creditors.model"); // Adjust path as needed

exports.createReport = async (req, res) => {
  try {
    const { itemList, createdBy, status, assignedTo } = req.body; // Make sure `assignedTo` is included here

    // Create a new Report instance
    const newReport = new Report({
      itemList,
      createdBy,
      status,
      assignedTo, // Include assignedTo here
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
  const id = req.params.id;

  try {
    // Find the report by ID and populate itemList.reportId based on itemType
    const report = await Report.findById(id)
    console.log(report);
    
      // Populate itemList.reportId based on itemType
      const populatedItemList = await Promise.all(
        report.itemList.map(async (item) => {
          let populatedItem = item;
          if (item.itemType === 'Cash') {
            populatedItem.reportId = await Cash.findById(item.reportId);
          } else if (item.itemType === 'ATM') {
            populatedItem.reportId = await ATM.findById(item.reportId);
          } else if (item.itemType === 'Creditors') {
            populatedItem.reportId = await Creditors.findById(item.reportId);
          }
          return populatedItem;
        })
      );
  
      // Attach the populated itemList to the report
      report.itemList = populatedItemList;
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get all Reports
exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().populate("itemList.reportId"); // Populate referenced documents
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Report by ID
exports.updateReportById = async (req, res) => {
  try {
    const { data, totalPrice, totalFuel, itemList, createdBy, status } =
      req.body;

    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
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
      return res.status(404).json({ message: "Report not found" });
    }
    res.json({ message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
