const Maintanence = require("../models/maintanence");
const User = require("../models/user");
const vehicle = require("../models/vehicle");

// add Maintanence
const addMaintanece = async (req, res) => {
  try {
    console.log(req.body);
    const newMaintanence = new Maintanence(req.body);
    await newMaintanence.save();
    return res.status(200).json({ success: "Maintanence added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Maintanence
const getMaintanences = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({ userId: userId });
    let Vehicles;
    let Maintanences;
    if (user.role == "employee") {
      Vehicles = await vehicle.find({ userId: userId }).sort({ _id: 1 });
      Maintanences = await Maintanence.find({ userId: userId })
        .populate("vehicle")
        .sort({ _id: 1 });
    } else {
      Vehicles = await vehicle.find().sort({ _id: 1 });
      Maintanences = await Maintanence.find()
        .populate("vehicle")
        .sort({ _id: 1 });
    }
    return res.status(200).json({ Maintanences, Vehicles });
  } catch (error) {
    console.log(error);
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
