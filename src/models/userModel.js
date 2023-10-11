import mongoose from "mongoose";

// create a new userSchema object
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    require: [true, "please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "please provide a password"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifiedToken: {
    type: String,
  },
  verifiedExpires: {
    type: Date,
  },
  forgotpasswordToken: {
    type: String,
  },
  forgotpasswordExpires: {
    type: Date,
  },
});
//create user model
const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
