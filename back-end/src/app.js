const express = require('express');
const { json } = require('body-parser');

const TaskRouter = require('./app/routers/Task');
const error = require('./app/middlewares/error');

const app = express();

app.use(json());

app.use('/task', TaskRouter);

app.use(error);

module.exports = app;
