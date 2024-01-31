const router = require('express').Router();
const Task = require('../models/task');
const { authenticateUser } = require('./middleware'); 

router.post('/tasks', authenticateUser, async (req, res) => {
    try {
        const task = new Task({
            name: req.body.name,
            description: req.body.description,
            user: req.user._id,
        });

        const result = await task.save();
        res.status(201).json({ message: 'Task created successfully', task: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/tasks', authenticateUser, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// get completed tasks
router.get('/tasks/completed', authenticateUser, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id, status: true });
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// get the incompleted tasks
router.get('/tasks/incompleted', authenticateUser, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id, status: false });
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// get all dates of completed tasks and incompleted tasks with the number of tasks of each date
router.get('/tasks/summary', authenticateUser, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        const summary = {};
        tasks.forEach(task => {
          const date = task.completionDate || task.creationDate; // Use completionDate if available, else use creationDate
          const formattedDate = new Date(date).toDateString();
    
          if (!summary[formattedDate]) {
            summary[formattedDate] = { completed: 0, incompleted: 0 };
          }
    
          if (task.status) {
            summary[formattedDate].completed++;
          } else {
            summary[formattedDate].incompleted++;
          }
        });
    
        res.send(summary);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

// update a task
router.put('/tasks/:id', authenticateUser, async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        if (req.body.name) {
            task.name = req.body.name;
        }

        if (req.body.description) {
            task.description = req.body.description;
        }

        if (req.body.status) {
            task.status = req.body.status;
            task.completionDate = Date.now();
        }

        await task.save();
        res.status(200).json({ message: 'Task updated successfully', task });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// delete a task
router.delete('/tasks/:id', authenticateUser, async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
        await task.delete();
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// get a task
router.get('/tasks/:id', authenticateUser, async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
        res.status(200).send(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// mark a task as completed
router.put('/tasks/mark-completed/:id', authenticateUser, async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
        task.status = true;
        task.completionDate = Date.now();
        await task.save();
        res.status(200).json({ message: 'Task marked as completed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// get the number of completed tasks and incompleted tasks and all tasks
router.get('/tasks/completed/number', authenticateUser, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        const completedTasks = tasks.filter(task => task.status === true);
        const incompletedTasks = tasks.filter(task => task.status === false);
        const allTasks = tasks.length;
        const completed = completedTasks.length;
        const incompleted = incompletedTasks.length;
        res.status(200).send({ completed, incompleted, allTasks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// get the percentage of completed tasks 
router.get('/tasks/completed/percentage', authenticateUser, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        const completedTasks = tasks.filter(task => task.status === true);
        const allTasks = tasks.length;
        const completed = completedTasks.length;
        const percentage = (completed / allTasks) * 100;
        res.send({ percentage });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// get the completed tasks between two dates
router.get('/tasks/completed/:start_date/:end_date', authenticateUser, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id, status: true });
        const completedTasks = tasks.filter(task => {
            const taskDate = new Date(task.completionDate);
            const startDate = new Date(req.params.start_date);
            const endDate = new Date(req.params.end_date);
            return taskDate >= startDate && taskDate <= endDate;
        });
        res.send({ completedTasks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//get the number of completed tasks  and incompleted tasks and all tasks between two dates
router.get('/tasks/completed/number/:start_date/:end_date', authenticateUser, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        const completedTasks = tasks.filter(task => {
            const taskDate = new Date(task.completionDate);
            const startDate = new Date(req.params.start_date);
            const endDate = new Date(req.params.end_date);
            return taskDate >= startDate && taskDate <= endDate;
        });
        const incompletedTasks = tasks.filter(task => {
            const taskDate = new Date(task.creationDate);
            const startDate = new Date(req.params.start_date);
            const endDate = new Date(req.params.end_date);
            return !task.status && taskDate >= startDate && taskDate <= endDate;
        });
        const completed = completedTasks.length;
        const incompleted = incompletedTasks.length;
        const allTasks = completed + incompleted;
        res.send({ completed, incompleted, allTasks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}); 

// get the number completed and incompleted tasks of a date 
router.get('/tasks/completed/:date', authenticateUser, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        const completedTasks = tasks.filter(task => {
            const taskDate = new Date(task.completionDate);
            const date = new Date(req.params.date);
            return taskDate.toDateString() === date.toDateString();
        });
        const incompletedTasks = tasks.filter(task => {
            const taskDate = new Date(task.creationDate);
            const date = new Date(req.params.date);
            return !task.status && taskDate.toDateString() === date.toDateString();
        });
        const completed = completedTasks.length;
        const incompleted = incompletedTasks.length;
        res.send({ completed, incompleted });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// get the number of completed tasks and incompleted tasks and all tasks of a year by month 
router.get('/tasks/completion-rate/monthly', authenticateUser, async (req, res) => {
    try {
        const monthlyCompletionRateData = await getMonthlyCompletionRate(req.user._id);
        res.send(monthlyCompletionRateData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const getMonthlyCompletionRate = async (userId) => {
    const tasks = await Task.find({ user: userId });
    const monthlyCompletionRateData = {};
    tasks.forEach(task => {
        const date = task.completionDate || task.creationDate;
        const month = getMonthName(new Date(date).getMonth() + 1);
        if (!monthlyCompletionRateData[month]) {
            monthlyCompletionRateData[month] = { completed: 0, incompleted: 0, allTasks: 0 };
        }
        if (task.status) {
            monthlyCompletionRateData[month].completed++;
        } else {
            monthlyCompletionRateData[month].incompleted++;
        }
        monthlyCompletionRateData[month].allTasks++;
    });
    return monthlyCompletionRateData;
}

const getMonthName = (month) => {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return monthNames[month - 1];
};



module.exports = router;
