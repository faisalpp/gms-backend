const Maintanence = require("../models/maintanence");
const vehicle = require("../models/vehicle");

// add Maintanence
const addMaintanece = async (req, res) => {
  try {
    const newMaintanence = new Maintanence(req.body);
    await newMaintanence.save();
    return res.status(200).json({ success: "Maintanence added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Maintanence
const getMaintanences = async (req, res) => {
  try {
    const Vehicles = await vehicle.find().sort({ _id: 1 });
    const Maintanences = await Maintanence.find()
      .populate("vehicle")
      .sort({ _id: 1 });
    return res.status(200).json({ Maintanences, Vehicles });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update Maintanence
const updateMaintanence = async (req, res) => {
  try {
    await Maintanence.findByIdAndUpdate(req.body._id, req.body);
    return res
      .status(200)
      .json({ success: "Maintanence updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteMaintanence = async (req, res) => {
  try {
    await Maintanence.findByIdAndDelete(req.body.id);
    return res
      .status(200)
      .json({ success: "Maintanence deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addMaintanece,
  getMaintanences,
  updateMaintanence,
  deleteMaintanence,
};
