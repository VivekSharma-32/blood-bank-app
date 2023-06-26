const express = require("express");

// rest object
const app = express();

// routes
// Test route
app.use("/api/v1/test", require("./src/routes/testRoutes"));

// PORT
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
