const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Simple API route
app.get("/", (req, res) => {
  res.json({ message: "Hello from Node + Docker + MongoDB!" });
});

// Connect to MongoDB using the docker compose service name 'mongo'
const mongoUrl = process.env.MONGO_URL || "mongodb://mongo:27017/mydb";
mongoose.connect(mongoUrl)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
