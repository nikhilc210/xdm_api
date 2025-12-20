const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const categoryRoutes = require("./routes/Category");
const adminRoutes = require("./routes/Admin");
const informativeRoutes = require("./routes/Informative");
const imageRoutes = require("./routes/Files");
const newsRoutes = require("./routes/News");
const adRoutes = require("./routes/Ads");
const authRoutes = require("./routes/Auth");
const reactionRoutes = require("./routes/Reaction");
const path = require("path");

const app = express();

dotenv.config();
connectDB();
app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5001;

//ROUTES

app.use("/api/categories", categoryRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/informative", informativeRoutes);
app.use("/api/upload", imageRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/ads", adRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reactions", reactionRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to xdm");
});

app.listen(PORT, "0.0.0.0", () =>
  console.log(`app is running on port ${PORT}`)
);
