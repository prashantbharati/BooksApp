import mongoose, { Schema } from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  ReferredUser: { type: Schema.Types.ObjectId, ref: "User" },
  isPaymentMade: { type: Boolean, required: true },
  TotalEarning: { type: Number, required: true },
});

export default mongoose.model("User", userSchema);
