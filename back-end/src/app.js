const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');

const TaskRouter = require('./app/routers/Task');
const error = require('./app/middlewares/error');

const app = express();

app.use(cors());

app.use(json());

app.use('/task', TaskRouter);

app.use(error);

module.exports = app;
