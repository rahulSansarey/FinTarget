
# Node.js API for Task Processing with Rate Limiting and Queuing System

This Node.js API is designed to process tasks with user-based rate limiting and queuing. The API limits each user to 1 task per second and 20 tasks per minute. When users exceed this limit, tasks are queued and processed sequentially according to the rate limits.


## Features

- Rate Limiting: Limits each user to 1 task per second and 20 tasks per minute.
- Task Queuing: Tasks that exceed the rate limit are queued and processed sequentially.
- Logging: Task completions are logged with details such as task ID, user ID, description, status, and timestamp.



## Tech Stack

**Server:** Node, Express,ioredis,rate-limiter-flexible,axios


## Note
As of now I am adding the env file in this repository for faster project setup, but initially we don't push .env as it contains sensitive information like passwords and secret key.


## Installation

Install This-project with npm

```bash
  npm i
  cd FinTarget
```

**Redis:** Start redis sever if not available download from here https://github.com/microsoftarchive/redis/releases

```bash
  nodemon server.js
```


## API ENDPOINTS:


Method: POST

```bash
http://localhost:3000/api/v1/task
```

Json Data
```bash
{
    "user_id": "User123",
    "task_id": "task12345",
    "description": "This is a sample task"
}
```

**Response**
200 OK: Task accepted and will be processed.
429 Too Many Requests: Rate limit exceeded, task has been queued.
Logs

## Appendix

Also created a script to send multiple request with file named as  **script.js** in other terminal run the command using 

```bash
node script.js
```

And then It will started sending a request and started logging in the data ***task_logs.txt*** file
## Authors

- [@rahulSansarey](https://www.github.com/octokatherine)

