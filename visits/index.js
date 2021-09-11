const express = require("express");
const redis = require("redis");
const process = require("process");

const app = express();
const client = redis.createClient({
  host: "redis-server",
  port: 6379,
});

client.set("visits", 0);

app.get("/", (_req, res) => {
  // line for checking restart
  // process.exit(0);
  client.get("visits", (_err, visits) => {
    res.send(`Number of visits is ${visits}`);
    client.set("visits", Number(visits) + 1);
  });
});

app.listen(8081, () => {
  console.log("Listening on port 8081");
});
