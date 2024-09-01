const express = require("express");
const taskRoutes = require("./routes/taskRoutes");

const os = require("os");

const checkCores = os.cpus().length;
console.log(checkCores);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1", taskRoutes);

app.listen(PORT, () => {
  console.log(`Worker ${process.pid} started on port ${PORT}`);
});
