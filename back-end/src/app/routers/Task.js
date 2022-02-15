const express = require('express');
const rescue = require('express-rescue');

const TaskController = require('../controllers/Task');

const router = express.Router({ mergeParams: true });

router.get('/', rescue(TaskController.getAll));
router.post('/', rescue(TaskController.create));

module.exports = router;
