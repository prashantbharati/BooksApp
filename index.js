import mongoose from "mongoose";
import bodyParser from "body-parser";
import express from "express";
import path from "path";
import UserModel from "./models/user.js";
import dotenv from "dotenv";
import update from "./controllers/module.js";
import create from "./controllers/create.js";
import check from "./controllers/check.js";
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();

const PORT = 5000;
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/check", (req, res) => {
  res.sendFile(__dirname + "/check.html");
});

app.get("/update", (req, res) => {
  res.sendFile(__dirname + "/update.html");
});

app.post("/", create);

app.post("/update", update);

app.post("/check", check);

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port:${PORT}`))
  )
  .catch((error) => console.log(error.message));
