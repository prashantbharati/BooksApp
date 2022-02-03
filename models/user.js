import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  ReferredUserid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isPaymentMade: { type: Boolean, required: true },
  TotalEarning: { type: Number, required: true },
});

// const UserModel = mongoose.model("User", userSchema);

userSchema.virtual(
  "refereals",
  {
    ref: "User",
    localField: "_id",
    foreignField: "ReferredUserid",

    justOne: true,
  },
  { toJSON: { virtual: true } }
); /* toJSON option is set because virtual fields are not included in toJSON output by default. So, if you don't set this option, and call User.find().populate('refereals'), you won't get anything in refereals */

export default mongoose.model("User", userSchema);
