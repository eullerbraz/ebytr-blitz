const TaskModel = require('../models/Task');

const getAll = async () => {
  const tasks = await TaskModel.find({});

  return tasks;
}

module.exports = {
  getAll,
}
