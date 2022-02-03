import mongoose from "mongoose";
import UserModel from "./models/user.js";

const create = async (req, res) => {
  const mail = req.body.ReferredUserid;
  if (mail != null) {
    const ruser = await UserModel.findOne({ email: mail });
    console.log(ruser);
    if (ruser != null) req.body.ReferredUserid = ruser._id;
    else req.body.ReferredUserid = null;
  }
  const data = req.body;

  try {
    const user = new UserModel({
      ...data,
    });
    await user.save();
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

export default create;
