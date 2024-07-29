const axios = require("axios");
const Pump = require("../models/pump.model");

const getFuelData = async () => {
  try {
    const response = await axios.get(`http://localhost:4043/fuel/v1/sys/view`);
    return response.data;
  } catch (error) {
    console.error("Error fetching fuel data:", error);
    throw new Error("Could not fetch fuel data");
  }
};

// Create a new Pump
exports.savePump = async (req, res) => {
  try {
    const pump = new Pump(req.body);
    await pump.save();
    res.status(201).json(pump);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Pumps
exports.getAllPumps = async (req, res) => {
  try {
    // Fetch fuel data
    const fuelData = await getFuelData();
    // Map fuel data to a dictionary for easy lookup
    const fuelDataMap = fuelData.reduce((map, item) => {
      map[item._id] = item;
      return map;
    }, {});

    // Fetch pump data
    const pumps = await Pump.find({ status: "idle" });

    // Update pumps with fuel data
    const updatedPumps = pumps.map((item) => {
      const fuel = fuelDataMap[item.fuel];
      if (fuel) {
        return {
          ...item.toObject(), // Convert Mongoose document to plain object
          fuel: {
            name: fuel.fuel,
            price: fuel.price,
            status: fuel.status,
          },
        };
      }
      return item.toObject(); // Convert Mongoose document to plain object
    });

    res.status(200).json(updatedPumps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a Pump by ID
exports.getPumpById = async (req, res) => {
  try {
    // Fetch fuel data
    const fuelData = await getFuelData();
    const fuelDataMap = fuelData.reduce((map, item) => {
      map[item._id] = item;
      return map;
    }, {});

    const pump = await Pump.findById(req.params.id);

    // Update pumps with fuel data
    const updatedPumps = [pump].map((item) => {
      const fuel = fuelDataMap[item.fuel];
      if (fuel) {
        return {
          ...item.toObject(), // Convert Mongoose document to plain object
          fuel: {
            name: fuel.fuel,
            price: fuel.price,
            status: fuel.status,
          },
        };
      }
      return item.toObject(); // Convert Mongoose document to plain object
    });

    res.status(200).json(updatedPumps);
    if (!pump) {
      return res.status(404).json({ error: "Pump not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Pump by ID
exports.updatePumpById = async (req, res) => {
  try {
    const pump = await Pump.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!pump) {
      return res.status(404).json({ error: "Pump not found" });
    }
    res.status(200).json(pump);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Pump by ID
exports.deletePumpById = async (req, res) => {
  try {
    const pump = await Pump.findByIdAndDelete(req.params.id);
    if (!pump) {
      return res.status(404).json({ error: "Pump not found" });
    }
    res.status(200).json({ message: "Pump deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
