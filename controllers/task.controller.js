const Task = require("../models/task.model").Task;

async function getTaskList(req, res) {

    const tasks = await Task.find({
        isDone: false
    }).sort("-createAt");

    if (tasks) {
        res.json({
            data: tasks
        })
    } else {
        res.json({
            data: []
        });
    }
}

async function createNewTask(req, res) {
    const body = req.body;

    if (body.name) {

        try {
            await new Task({
                name: body.name,
                description: body.desc ? body.desc : ""
            }).save();

            res.json({
                message: "SUCCESS!"
            })
        } catch (err) {
            res.status(500).json({
                message: "ERROR STORING NEW TASK"
            })
        }
    } else {
        res.status(402).json({
            message: "NO TASK NAME"
        })
    }
}

async function doneTask(req, res) {
    const body = req.body;

    if (body.taskId) {

        try {
            await Task.updateOne({
                _id: body.taskId,
            },{
                $set: {
                    isDone: true
                }
            });

            res.json({
                message: "SUCCESS!"
            })
        } catch (err) {
            res.status(500).json({
                message: "ERROR UPDATING TASK"
            })
        }
    } else {
        res.status(402).json({
            message: "NO TASK ID"
        })
    }
}

module.exports = {
    getTaskList,
    createNewTask,
    doneTask
}
