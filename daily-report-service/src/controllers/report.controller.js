const Report = require('../models/mainReport.model');

// Create a new Report
exports.createReport = async (req, res) => {
  try {
    const {
      itemList,
      createdBy,
      status,
    } = req.body;

    const newReport = new Report({
      // data,
      // totalPrice,
      // totalFuel,
      itemList,
      createdBy,
      status,
    });
    // Populate the references in itemList
    const populatedReport = await Report.findById(newReport._id)
      .populate({
        path: 'itemList.reportId',
        match: { itemType: { $in: ['Cash', 'ATM', 'Creditors'] } },
        select: 'reportId', // Specify fields to populate if needed
      })
      .exec();
    console.log(populatedReport);
    
    // await newReport.save();
    res.status(201).json(populatedReport);
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
