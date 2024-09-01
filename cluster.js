const cluster = require("cluster");
const os = require("os");

if (cluster.isMaster) {
  // Fork workers.
  for (let i = 0; i < 2; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork(); // Restart the worker on failure
  });
} else {
  // Start the Express app in worker
  require("./app");
}
