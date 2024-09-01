const fs = require("fs");
const path = require("path");
const { RateLimiterRedis } = require("rate-limiter-flexible");
const redisClient = require("../config/redis");

const rateLimiter = new RateLimiterRedis({
  redis: redisClient,
  keyPrefix: "rateLimiter",
  points: 20, // 20 tasks per minute
  duration: 60, // Per 60 seconds
  blockDuration: 1, // Block for 1 second after consuming all points
  execEvenly: true,
});

const taskQueue = {};

async function task(userId, taskDetails) {
  // Prepare log entry with task details
  const logMessage = `Task ID: ${taskDetails.id || "undefined"}, Description: ${
    taskDetails.description || "undefined"
  }, Status: completed, User ID: ${userId}, Timestamp: ${Date.now()}\n`;

  // Append log entry to the log file
  fs.appendFile(
    path.join(__dirname, "../logs/task_logs.txt"),
    logMessage,
    (err) => {
      if (err) throw err;
      console.log(logMessage); // Log to console for debugging
    }
  );
}

async function processQueue(userId) {
  while (taskQueue[userId] && taskQueue[userId].length > 0) {
    const taskFn = taskQueue[userId].shift();
    await taskFn(); 

    //It will Wait for 1 second before processing the next task
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

async function handleTaskRequest(req, res) {
  const userId = req.body.user_id;
  const taskDetails = {
    id: req.body.task_id || "undefined",
    description: req.body.description || "undefined", // If noo desciption is given then it will give undefined
  };

  try {
    await rateLimiter.consume(userId, 1);

    if (!taskQueue[userId]) {
      taskQueue[userId] = [];
    }

    taskQueue[userId].push(() => task(userId, taskDetails));

    if (taskQueue[userId].length === 1) {
      processQueue(userId);
    }

    res.status(200).send("Task accepted");
  } catch (err) {
    res.status(429).send("Rate limit exceeded. Task queued.");
  }
}

module.exports = {
  handleTaskRequest,
};
