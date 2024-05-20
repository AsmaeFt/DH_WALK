const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullname: { type: String, default: "" },
  email: { type: String, default: "" },
  password: { type: String, default: "" },
  role: {
    type: String,
    required: true,
    enum: ["Root", "FA_MANAGER", "QUALITY", "lOGISTIC", "CUTTING"],
  },
  isConfigured: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("User", UserSchema);
