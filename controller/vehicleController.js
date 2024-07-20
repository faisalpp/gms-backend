const User = require("../models/user");
const Vehicle = require("../models/vehicle");

// add vehicle
const addVehicle = async (req, res) => {
  try {
    const newVehicle = new Vehicle(req.body);
    await newVehicle.save();
    return res.status(200).json({ success: "Vehicle added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Vehicle
const getVehicles = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({ userId: userId }); // Ensure you use `_id` to find the user by their unique identifier
    let Vehicles;

    if (user.role === "employee") {
      // Employees see only their own vehicles
      Vehicles = await Vehicle.find({ userId: userId }).sort({ _id: 1 });
    } else if (user.role === "admin") {
      // Admins see their own vehicles and vehicles of all users they created
      const usersCreatedByAdmin = await User.find({ refer_id: userId });
      const userIds = usersCreatedByAdmin.map((user) => user.userId);
      userIds.push(userId); // Include admin's own userId
      Vehicles = await Vehicle.find({ userId: userIds }).sort({ _id: 1 });
    } else if (user.role === "superadmin") {
      // Superadmins see all vehicles
      Vehicles = await Vehicle.find().sort({ _id: 1 });
    }
    return res.status(200).json({ Vehicles });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update Vehicle
const updateVehicle = async (req, res) => {
  try {
    await Vehicle.findByIdAndUpdate(req.body._id, req.body);
    return res.status(200).json({ success: "Vehicle updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteVehicle = async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.body.id);
    return res.status(200).json({ success: "Vehicle Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addVehicle, getVehicles, updateVehicle, deleteVehicle };
