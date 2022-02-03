import mongoose from "mongoose";
import UserModel from "./models/user.js";

export const update = async (req, res) => {
  const email1 = req.body.email;
  const ruser = await UserModel.findOne({ email: email1 });
  // const val = ruser.TotalEarning;
  const ruser2 = await UserModel.findById(ruser.ReferredUserid);

  const updatepost = await UserModel.findByIdAndUpdate(
    ruser._id,
    { isPaymentMade: true },
    { new: true }
  );

  console.log(updatepost);

  let updatepost2;
  if (mongoose.Types.ObjectId.isValid(ruser2._id)) {
    const val = ruser2.TotalEarning;
    updatepost2 = await UserModel.findByIdAndUpdate(
      ruser2._id,
      { TotalEarning: val + 10 },
      { new: true }
    );
  }

  // ruser2.TotalEarning=ruser2.TotalEarning+10;
  // ruser.isPaymentMade=true;
  res.status(200).send(updatepost2);
};

export default update;
