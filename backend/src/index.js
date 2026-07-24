const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "finz-app API is alive" });
});

app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
