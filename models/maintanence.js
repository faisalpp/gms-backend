const mongoose = require("mongoose");

const MaintanenceSchema = new mongoose.Schema({
  date: {
    type: String,
  },
  cost: {
    type: Number,
  },
  workshop: {
    type: String,
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
  },
  details: {
    type: String,
  },
});

module.exports =
  mongoose.models.Maintanence ||
  mongoose.model("Maintanence", MaintanenceSchema);
