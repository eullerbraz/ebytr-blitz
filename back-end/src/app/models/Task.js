const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: String,
  status: String,
  createDate: String,
});

module.exports = mongoose.model('Task', TaskSchema);
