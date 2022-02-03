import mongoose from "mongoose";
import UserModel from "./models/user.js";

const check = async (req, res) => {
  const email1 = req.body.email;
  const ruser = await UserModel.findOne({ email: email1 });
  const val = ruser.TotalEarning;
  console.log(val);

  res.send("Your earning is " + val + " Rs");
};

export default check;
