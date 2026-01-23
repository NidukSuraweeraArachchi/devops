const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');

app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello from Ceylon Explorer API!" });
});

// Connect to MongoDB
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/ceylon_explorer";

mongoose.connect(mongoUrl)
  .then(() => console.log("MongoDB connected to:", mongoUrl))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    // Continue even if DB fails for now, or process.exit(1)
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

