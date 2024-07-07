const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema(
  {
    type_of_bus: { type: String, required: true },
    plate_number: { type: String, required: true },
    body_no: { type: String, required: true },
    no_of_sheets: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Vehicle || mongoose.model("Vehicle", VehicleSchema);
