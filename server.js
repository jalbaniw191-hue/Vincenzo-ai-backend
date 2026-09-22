const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// PostgreSQL Database Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Home
app.get("/", (req, res) => {
  res.json({
    success: true,
    project: "Vincenzo AI",
    status: "online",
    message: "Vincenzo AI Backend is running!"
  });
});

// API Status
app.get("/api/status", (req, res) => {
  res.json({
    success: true,
    status: "online",
    service: "Vincenzo AI Backend"
  });
});

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Vincenzo AI API is running"
  });
});

// API Test
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Vincenzo AI API Test Successful"
  });
});

// Database Test
app.get("/api/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS time");

    res.json({
      success: true,
      database: "connected",
      time: result.rows[0].time
    });
  } catch (error) {
    console.error("Database Error:", error.message);

    res.status(500).json({
      success: false,
      database: "connection failed",
      error: error.message
    });
  }
});

// Start Server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Vincenzo AI Backend running on port ${PORT}`);
});
