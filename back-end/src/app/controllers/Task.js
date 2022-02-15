const TaskService = require('../services/Task');

const getAll = async (_req, res) => {
  const tasks = await TaskService.getAll();

  return res.status(200).json(tasks);
}

module.exports = {
  getAll,
}
