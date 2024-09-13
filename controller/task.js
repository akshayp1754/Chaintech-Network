const Task = require("../schema/task");

const taskController = {
  createTask: async (req, res) => {
    const { title, description, dueDate, category } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    try {
      const newTask = await Task.create({
        title,
        description,
        dueDate,
        category,
      });
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },

  getTasks: async (req, res) => {
    try {
      const tasks = await Task.find().lean().exec();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },

  updateTask: async (req, res) => {
    try {
      const { id } = req.params;
      const update = { $set: {} };

      if (req.body.title) update.$set.title = req.body.title;
      if (req.body.description) update.$set.description = req.body.description;
      if (req.body.dueDate) update.$set.dueDate = req.body.dueDate;
      if (req.body.category) update.$set.category = req.body.category;

      const task = await Task.findByIdAndUpdate(id, update, {
        new: true,
        runValidators: true,
      });
      if (!task) return res.status(404).json({ message: "Task not found" });

      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },

  completeTask: async (req, res) => {
    try {
      const { id } = req.params;

      const task = await Task.findByIdAndUpdate(
        id,
        { completed: true },
        { new: true }
      );
      if (!task) return res.status(404).json({ message: "Task not found" });
      if (task.completed)
        return res.status(400).json({ message: "Task already completed" });

      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
  deleteTask: async (req, res) => {
    try {
      const { id } = req.params;

      await Task.findByIdAndRemove(id);
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = taskController;
