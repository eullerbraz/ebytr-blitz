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

const update = async (id, task) => {
  const { error } = validateTask({ ...task, createDate: new Date()});

  if (error) {
    const [{ message }] = error.details;
    return { message, code: 400 };
  }

  const updated = await TaskModel.findByIdAndUpdate(id, task);

  if (!updated) return { message: 'Invalid id', code: 400 }

  return { task: updated }
}

const remove = async (id) => {
  const deleted = await TaskModel.findByIdAndDelete(id);

  if (!deleted) return { message: 'Invalid id', code: 400 }

  return { task: deleted }
}

module.exports = {
  getAll,
  create,
  update,
  remove,
}
