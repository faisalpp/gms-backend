const Driver = require("../models/driver");
const User = require("../models/user");

// add Driver
const addDriver = async (req, res) => {
  try {
    const newDriver = new Driver(req.body);
    await newDriver.save();
    return res.status(200).json({ success: "Driver added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Driver
const getDrivers = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({ userId: userId });
    let Drivers;
    if (user.role == "employee") {
      Drivers = await Driver.find({ userId: userId }).sort({ _id: 1 });
    } else {
      Drivers = await Driver.find().sort({ _id: 1 });
    }
    return res.status(200).json({ Drivers });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update Driver
const updateDriver = async (req, res) => {
  try {
    await Driver.findByIdAndUpdate(req.body._id, req.body);
    return res.status(200).json({ success: "Driver updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delet Driver
const deleteDriver = async (req, res) => {
  try {
    await Driver.findByIdAndDelete(req.body.id);
    return res.status(200).json({ success: "Driver Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addDriver, getDrivers, updateDriver, deleteDriver };
