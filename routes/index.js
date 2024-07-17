const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const vehicleController = require("../controller/vehicleController");
const driverController = require("../controller/driverController");
const bookingController = require("../controller/bookingController");
const maintanenceController = require("../controller/maintanenceController");

router.get("/", (req, res) => {
  res.send("Waiting For You Request");
});

// login user
router.post("/loginUser", userController.loginUser);
// get login user
router.post("/getUser", userController.getUser);

// add user
router.post("/addUser", userController.addUser);
// Update User
router.post("/updateUser", userController.updateUser);

// delete user
router.post("/deleteUser", userController.deleteUser);

// get all users
router.get("/users", userController.users);

// add Vehicle
router.post("/addVehicle", vehicleController.addVehicle);
// Get Vehicle
router.get("/getVehicles/:id", vehicleController.getVehicles);

// Update vehicle
router.post("/updateVehicle", vehicleController.updateVehicle);
// Delete vehicle
router.post("/deleteVehicle", vehicleController.deleteVehicle);

// add Driver
router.post("/addDriver", driverController.addDriver);
// Get Driver
router.get("/getDrivers/:id", driverController.getDrivers);

// Update Driver
router.post("/updateDriver", driverController.updateDriver);

// Delete Driver
router.post("/deleteDriver", driverController.deleteDriver);

// add Booking
router.post("/addBooking", bookingController.addBooking);
// Get Booking
router.get("/getBookings/:id", bookingController.getBookings);

router.post("/bookingMessage", bookingController.Messagetext);

// Update Booking
router.post("/updateBooking", bookingController.updateBooking);
// Delete Booking
router.post("/deleteBooking", bookingController.deleteBooking);

// add Maintanence
router.post("/addMaintanence", maintanenceController.addMaintanece);
// Get Booking
router.get("/getMaintanences/:id", maintanenceController.getMaintanences);

// Update Booking
router.post("/updateMaintanence", maintanenceController.updateMaintanence);
// Delete Booking
router.post("/deleteMaintanence", maintanenceController.deleteMaintanence);

// All Data
router.get("/allData/:id", userController.allData);

module.exports = router;
