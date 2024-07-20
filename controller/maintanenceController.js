const Maintenance = require("../models/maintanence");
const User = require("../models/user");
const Vehicle = require("../models/vehicle");

// add Maintanence
const addMaintanece = async (req, res) => {
  try {
    console.log(req.body);
    const newMaintanence = new Maintenance(req.body);
    await newMaintanence.save();
    return res.status(200).json({ success: "Maintenance added successfully" });
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
    let Maintenances;

    if (user.role === "employee") {
      // Employees see only their own vehicles and maintenances
      Vehicles = await Vehicle.find({ userId: userId }).sort({ _id: 1 });
      Maintenances = await Maintenance.find({ userId: userId })
        .populate("vehicle")
        .sort({ _id: 1 });
    } else if (user.role === "admin") {
      // Admins see their own vehicles and maintenances, and those of users they created
      const usersCreatedByAdmin = await User.find({ refer_id: userId });
      const userIds = usersCreatedByAdmin.map((user) => user.userId);
      userIds.push(userId); // Include admin's own userId

      Vehicles = await Vehicle.find({ userId: userIds }).sort({
        _id: 1,
      });
      Maintenances = await Maintenance.find({ userId: userIds })
        .populate("vehicle")
        .sort({ _id: 1 });
    } else if (user.role === "superadmin") {
      // Superadmins see all vehicles and maintenances
      Vehicles = await Vehicle.find().sort({ _id: 1 });
      Maintenances = await Maintenance.find()
        .populate("vehicle")
        .sort({ _id: 1 });
    }

    return res.status(200).json({ Maintenances, Vehicles });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update Maintanence
const updateMaintanence = async (req, res) => {
  try {
    await Maintenance.findByIdAndUpdate(req.body._id, req.body);
    return res
      .status(200)
      .json({ success: "Maintanence updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteMaintanence = async (req, res) => {
  try {
    await Maintenance.findByIdAndDelete(req.body.id);
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
