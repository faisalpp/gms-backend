const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    booking_id: { type: String, required: true },
    date_time: { type: String, required: true },
    customer_name: { type: String, required: true },
    mobile_no: { type: String, required: true },
    select_vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
    },
    select_driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
    },
    type_of_vehicle: { type: String, required: true },
    assigned_booking: { type: Number, required: true },
    amount: { type: Number, required: true },
    type_of_payment: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
