const express = require('express');
const { json } = require('body-parser');

const TaskRouter = require('./app/routers/Task');

const app = express();

app.use(json());

app.use('/task', TaskRouter);

module.exports = app;
