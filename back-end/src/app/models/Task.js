const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: String,
  status: {
    type: String,
    enum: ['Pendente', 'Em andamento', 'Pronto'],
  },
  createDate: Date,
}, { versionKey: false });

module.exports = mongoose.model('Task', TaskSchema);
