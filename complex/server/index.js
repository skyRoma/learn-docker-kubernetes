const keys = require('./keys');

// express app setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = new express();
app.use(cors());
app.use(bodyParser.json());

// postgres client setup
const { Pool } = require('pg');

const pgClient = new Pool({
  user: keys.pgUser,
  database: keys.pgDb,
  password: keys.pgPassword,
  host: keys.pgHost,
  port: keys.pgPort,
});

pgClient.on('connect', (client) => {
  client
    .query('CREATE TABLE IF NOT EXISTS values (number INT)')
    .catch((err) => console.error(err));
});

// redis client setup
const redis = require('redis');
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});

const redisPublisher = redisClient.duplicate();

// express route handlers
app.get('/', (_req, res) => {
  res.send('Hi');
});

app.get('/values', async (_req, res) => {
  const values = await pgClient.query('SELECT * FROM values');

  res.send(values.rows);
});

app.get('/values/current', async (_req, res) => {
  redisClient.hgetall('values', (_err, values) => {
    res.send(values);
  });
});

app.post('/values', async (req, res) => {
  const { index } = req.body;

  if (parseInt(index) > 20) {
    return res.status(422).send('Index too high');
  }

  redisClient.hset('values', index, 'Nothing yet!');
  redisPublisher.publish('insert', index);
  pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);

  res.send({ working: true });
});

app.listen(5000, (_err) => {
  console.log('Listening');
});
