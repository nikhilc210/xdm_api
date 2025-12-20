const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    location: { type: String },
    role: {
      type: String,
      enum: ["Super Administrator", "Publisher"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Suspend", "Inactive"],
      default: "Active",
    },
    deleted: { type: Boolean, default: false },

    // 👇 New field to track active session token
    currentToken: { type: String, default: null },
  },
  { timestamps: true }
);

// Password comparison method
adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Admin", adminSchema);
