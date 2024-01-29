const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use("/department", require("./Routes/departmentRoute"));
app.use("/employee", require("./Routes/employeeRoute"));

app.listen(port, () => {
  mongoose
    .connect(process.env.DATABASE_URI)
    .then(() => {
      console.log(`db connected and server is listenning on ${port}`);
    })
    .catch((err) => console.log(err));
});
