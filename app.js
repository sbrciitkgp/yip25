const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv=require("dotenv")
const connectDB = require("./config/db");
const mainRoutes = require("./routes/mainRoutes"); 

require("dotenv").config();


connectDB();


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/", mainRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
