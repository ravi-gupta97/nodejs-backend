const express = require("express");
const mongoose = require("mongoose");
const app = express();
const router = require("./routes/user-routes")
app.use(express.json());
app.use("/users",router);

mongoose.connect(
    "mongodb+srv://ravi:ravi123@cluster0.s4ljevv.mongodb.net/?retryWrites=true&w=majority").then(() => app.listen(5000, () => console.log("Connected to database and listening on port 5000"))).catch((err) =>
        console.log(err)
    );