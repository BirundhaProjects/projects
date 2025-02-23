const mongoose = require("mongoose");

// Regular expression for email validation
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: [emailRegex, "Please enter valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 8, // Validate password format
    },
    theme: { type: String, required: false },
    taskReminders: { type: Boolean, required: false },
    dailySummary: { type: Boolean, required: false },
    overdueTasks: { type: Boolean, required: false },
  },
  { timestamps: true }
);

// Method to check if the password is expired (more than 60 days old)
userSchema.methods.isPasswordExpired = function () {
  const currentDate = new Date();
  const passwordAge = currentDate - this.passwordUpdatedAt; // In milliseconds
  const days = passwordAge / (1000 * 60 * 60 * 24); // Convert to days
  return days > 60; // If password is older than 60 days, it's expired
};

// Pre-save hook to update the passwordUpdatedAt field whenever the password is changed
userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.passwordUpdatedAt = Date.now();
  }
  next();
});

module.exports = mongoose.model("Users", userSchema);
