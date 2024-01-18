const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Department = require("./Models/departments");
require("dotenv").config();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).send("hello  from apollonia clinic");
});
app.post("/dep", async (req, res) => {
  const { name, staffNumber } = req.body;
  try {
    const newDep = new Department({ name, staffNumber });
    newDep
      .save()
      .then(() => res.status(200).json({ newDep, message: "new dep added" }))
      .catch((err) => console.log(err.message));
  } catch (err) {
    res.status(500).send("error occured");
    console.log(err.message);
  }
});
app.listen(port, () => {
  mongoose
    .connect(process.env.DATABASE_URI)
    .then(() => {
      console.log(`db connected and server is listenning on ${port}`);
    })
    .catch((err) => console.log(err));
});
