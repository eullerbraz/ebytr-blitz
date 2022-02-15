const TaskService = require('../services/Task');

const getAll = async (_req, res) => {
  const tasks = await TaskService.getAll();

  return res.status(200).json(tasks);
}

const create = async (req, res, next) => {
  const {code, message, task} = await TaskService.create(req.body);

  if (message) return next({ message, code });

  return res.status(201).json(task);
}

module.exports = {
  getAll,
  create,
}
