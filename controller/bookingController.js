const Booking = require("../models/booking");
const Driver = require("../models/driver");
const Vehicle = require("../models/vehicle");

// add Driver
const addBooking = async (req, res) => {
  try {
    console.log(req.body);
    const newBooking = new Booking(req.body);
    await newBooking.save();
    return res
      .status(200)
      .json({ success: "Booking added successfully", booking: newBooking });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Driver
const getBookings = async (req, res) => {
  try {
    const Vehicles = await Vehicle.find().sort({ _id: 1 });
    const Drivers = await Driver.find().sort({ _id: 1 });
    const Bookings = await Booking.find()
      .populate("select_vehicle")
      .populate("select_driver")
      .sort({ _id: -1 })
      .exec();
    return res.status(200).json({ Bookings, Vehicles, Drivers });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update Driver
const updateBooking = async (req, res) => {
  try {
    await Booking.findByIdAndUpdate(req.body._id, req.body);
    return res.status(200).json({ success: "Booking updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.body.id);
    return res.status(200).json({ success: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const Messagetext = async (req, res) => {
  try {
    const message = await Booking.findById(req.body.id)
      .populate("select_vehicle")
      .populate("select_driver");
    return res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addBooking,
  getBookings,
  updateBooking,
  deleteBooking,
  Messagetext,
};
