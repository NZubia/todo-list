const express = require('express');
const router = express.Router();

const {
    getTaskList,
    createNewTask,
    doneTask
} = require("../controllers/task.controller");

/* GET home page. */
router.get('/list', getTaskList);

router.post('/create', createNewTask);

router.post('/done', doneTask);

module.exports = router;
