const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 8080;
const { connectDB } = require("./utils/db");
const taskRoutes = require("./routes/task");
const errorMiddleware = require("./middlewares/error");

connectDB();

app.use(express.json());
app.use("/api", taskRoutes);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
