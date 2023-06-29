const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./src/config/db");
// dotenv config
dotenv.config();

//MongoDB Connection
connectDB();

// rest object
const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// routes
// Test route
app.use("/api/v1/test", require("./src/routes/testRoutes"));
app.use("/api/v1/auth", require("./src/routes/authRoutes"));
app.use("/api/v1/inventory", require("./src/routes/inventoryRoutes"));

// PORT
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.DEV_MODE} mode and  on PORT: ${PORT}`
      .bgBlue.white
  );
});
