//123Prashant Prashant
import mongoose from "mongoose";
import bodyParser from "body-parser";
import express from "express";
import path from "path";
import UserModel from "./models/user.js";
import dotenv from "dotenv";
import update from "./module.js";

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();

const PORT = 5000;
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  // console.log(__dirname);
  res.sendFile(__dirname + "/index.html");
});

app.get("/check", (req, res) => {
  res.sendFile(__dirname + "/check.html");
});

app.get("/update", (req, res) => {
  res.sendFile(__dirname + "/update.html");
});

app.post("/", async (req, res) => {
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
});

app.post("/update", update);

app.post("/check", async (req, res) => {
  const email1 = req.body.email;
  const ruser = await UserModel.findOne({ email: email1 });
  const val = ruser.TotalEarning;
  console.log(val);
  // res.send("lol");
  res.send("Your earning is " + val + " Rs");
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
