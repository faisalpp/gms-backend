const Booking = require("../models/booking");
const Driver = require("../models/driver");
const User = require("../models/user");
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
    const userId = req.params.id;
    const user = await User.findOne({ userId: userId });
    let Vehicles;
    let Drivers;
    let Bookings;

    if (user.role === "employee") {
      // Employees see only their own data
      Vehicles = await Vehicle.find({ userId: userId }).sort({ _id: 1 });
      Drivers = await Driver.find({ userId: userId }).sort({ _id: 1 });
      Bookings = await Booking.find({ userId: userId })
        .populate("select_vehicle")
        .populate("select_driver")
        .sort({ _id: -1 })
        .exec();
    } else if (user.role === "admin") {
      // Admins see their own data and data of all users they created
      const usersCreatedByAdmin = await User.find({ refer_id: userId });
      const userIds = usersCreatedByAdmin.map((user) => user.userId);
      userIds.push(userId); // Include admin's own userId

      Vehicles = await Vehicle.find({ userId: userIds }).sort({ _id: 1 });
      Drivers = await Driver.find({ userId: userIds }).sort({ _id: 1 });
      Bookings = await Booking.find({ userId: userIds })
        .populate("select_vehicle")
        .populate("select_driver")
        .sort({ _id: -1 })
        .exec();
    } else if (user.role === "superadmin") {
      // Superadmins see all data
      Vehicles = await Vehicle.find().sort({ _id: 1 });
      Drivers = await Driver.find().sort({ _id: 1 });
      Bookings = await Booking.find()
        .populate("select_vehicle")
        .populate("select_driver")
        .sort({ _id: -1 })
        .exec();
    }
    TotalBookings = await Booking.find();
    // Find the highest booking ID
    let highestBookingId = 0;
    if (TotalBookings.length > 0) {
      highestBookingId = Math.max(
        ...TotalBookings.map((booking) => Number(booking.booking_id))
      );
    }

    const nextBookingId = highestBookingId + 1;

    return res.status(200).json({ Bookings, Vehicles, Drivers, nextBookingId });
  } catch (error) {
    console.log(error);
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
