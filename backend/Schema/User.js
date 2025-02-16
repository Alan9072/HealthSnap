import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String }, // Full Name
  username: { type: String, unique: true, sparse: true }, // For normal login // For Google login
  password: { type: String },
  gender: { type: String },
  age: { type: Number },
  height: { type: String },
  weight: { type: String },
  dietType: { type: String },
  allergies: { type: String },
  intolerances: { type: String },
  preExistingConditions: { type: String },
  currentMedications: { type: String },
  medicalHistory: { type: String },
});

module.exports = mongoose.model("User", UserSchema);
