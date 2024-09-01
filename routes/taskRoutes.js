const express = require("express");
const { handleTaskRequest } = require("../controllers/taskController");

const router = express.Router();

router.post("/task", handleTaskRequest);

module.exports = router;
