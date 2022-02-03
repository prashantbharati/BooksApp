//123Prashant Prashant
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const PORT = 5000;

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

var UserModel = mongoose.model("User", userSchema);

const auser1 = new UserModel({
  name: "Prashant",
  email: "prashantbhrati92@gmail.com",
  ReferredUserid: null,
  isPaymentMade: false,
  TotalEarning: 0,
});

const auser2 = new UserModel({
  name: "Ritik",
  email: "Ritik@gmail.com",
  ReferredUserid: null,
  isPaymentMade: false,
  TotalEarning: 0,
});

// auser.save((err, data) => {
// console.log(err);
// });

// try {
//   auser2.save();
//   console.log("lol");
// } catch (error) {
//   console.log(error);
// }

// try {
//   const postMessages = await auser.find();
//   console.log(postMessages);
// } catch (error) {
//   console.log(error);
// }

app.get("/", (req, res) => {
  res.send("lololo");
});

app.get("/getposts", async (req, res) => {
  try {
    const postMessages = await UserModel.find();
    const post0 = postMessages[0];
    // console.log(post0._id);
    console.log(post0.ReferredUserid);
    const updatedPost = await UserModel.findById(post0._id);
    // console.log(updatedPost);

    // const posts = post.split(" ");
    // console.log(posts[1]);
    // console.log(postMessages);
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/createpost", async (req, res) => {
  const ruser = await UserModel.findOne({ email: "Ritik@gmail.com" });
  console.log(ruser);
  console.log(ruser._id);
  const auser3 = new UserModel({
    name: "ABC",
    email: "ABC92@gmail.com",
    ReferredUserid: ruser._id,
    isPaymentMade: false,
    TotalEarning: 0,
  });

  await auser3.save();

  res.send("lol");
});

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port:${PORT}`))
  )
  .catch((error) => console.log(error.message));
