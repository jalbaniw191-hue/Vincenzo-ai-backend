const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 3000;

// JSON support
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
    message: "Vincenzo AI Backend is running"
  });
});

// Status
app.get("/api/status", (req, res) => {
  res.json({
    success: true,
    project: "Vincenzo AI",
    status: "online"
  });
});

// Health Check
app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");

    res.json({
      success: true,
      server: "online",
      database: "connected"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      server: "online",
      database: "error",
      message: error.message
    });
  }
});

// Basic API Test
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API is working"
  });
});

// Database Test
app.get("/api/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS current_time");

    res.json({
      success: true,
      database: "connected",
      message: "PostgreSQL database is working",
      time: result.rows[0].current_time
    });
  } catch (error) {
    console.error("Database Error:", error);

    res.status(500).json({
      success: false,
      database: "not connected",
      error: error.message
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Vincenzo AI Backend running on port ${PORT}`);
});
