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

const update = async (req, res, next) => {
  const { id } = req.params;
  const {code, message, task} = await TaskService.update(id, req.body);

  if (message) return next({ message, code });

  return res.status(200).json(task);
}

const remove = async (req, res, next) => {
  const { id } = req.params;
  const { task, message, code } = await TaskService.remove(id);

  if (message) return next({ message, code });

  return res.status(200).json(task);
}

module.exports = {
  getAll,
  create,
  update,
  remove,
}
