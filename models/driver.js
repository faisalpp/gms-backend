const mongoose = require("mongoose");

const DriverSchema = new mongoose.Schema(
  {
    driverid: { type: String, required: true },
    name: { type: String, required: true },
    moile_no: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Driver || mongoose.model("Driver", DriverSchema);