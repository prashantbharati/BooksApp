//123Prashant Prashant
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const PORT = 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port:${PORT}`))
  )
  .catch((error) => console.log(error.message));
