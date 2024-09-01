const axios = require("axios");

const userId = "testUser";
const taskId = "12345";
const description = "New Task";

async function sendRequests() {
  for (let i = 0; i < 50; i++) {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/task", {
        user_id: userId,
        task_id: taskId,
        description: description,
      });
      console.log(`Request ${i + 1} - Status: ${response.status}`);
    } catch (error) {
      console.log(`Request ${i + 1} - Error: ${error.response.status}`);
    }
  }
}

sendRequests();
