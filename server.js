const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    project: "Vincenzo AI",
    status: "online",
    message: "Vincenzo AI Backend is running!"
  });
});

app.get("/api/status", (req, res) => {
  res.json({
    success: true,
    status: "online",
    service: "Vincenzo AI Backend"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Vincenzo AI Backend running on port ${PORT}`);
});
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Vincenzo AI API is running"
  });
});
