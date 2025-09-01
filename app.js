const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ====== Middlewares ======
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ====== View Engine ======
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ====== Routes ======
const mainRoutes = require("./routes/mainRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const noticeRoutes = require("./routes/noticeRoutes");

app.use("/", mainRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", adminRoutes);
app.use("/", noticeRoutes);

// ====== Server ======
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
