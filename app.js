require("dotenv").config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);
app.use(express.json());

const userRoute = require("./routes/users");

app.use("/users", userRoute);

app.get("*", (req, res) => {
  res.status(200).json({ msg: "No Route Found!" });
});

app.listen(process.env.PORT, console.log(`Server is running at port ${process.env.PORT} `));
