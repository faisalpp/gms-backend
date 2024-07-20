const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  locale: {
    type: String,
    default: "en",
  },
  refer_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["superadmin", "admin", "employee"],
    default: "employee",
  },
  isLoggedIn: {
    type: Number,
    default: 0,
    required: true,
  },
  phone_no: {
    type: String,
  },
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
