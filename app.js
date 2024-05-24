const express = require("express");
const app = express();
const users = require("./routes/users");
const bodyParser = require("body-parser");

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api", users);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
