const Joi = require('joi');

const TaskModel = require('../models/Task');

const validateTask = (task) => Joi.object({
  name: Joi.string().not().empty().required(),
  status: Joi.any().valid('Pendente', 'Em andamento', 'Pronto'),
  createDate: Joi.date().required(),
}).validate(task);

const getAll = async () => {
  const tasks = await TaskModel.find({});

  return tasks;
}

const create = async (task) => {
  const { error } = validateTask(task);

  if (error) {
    const [{ message }] = error.details;
    return { message, code: 400 };
  }

  const created = await TaskModel.create(task);

  return { task: created }
}

module.exports = {
  getAll,
  create,
}
