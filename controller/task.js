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
      return res.status(201).json({
        message: "Task created successfully",
        success: true,
        data: newTask,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error.message,
        success: false,
        data: null,
      });
    }
  },

  getTasks: async (req, res) => {
    try {
      const tasks = await Task.find().lean().exec();
      return res.status(200).json({
        message: "Tasks fetched successfully",
        success: true,
        data: tasks,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error.message,
        success: false,
        data: null,
      });
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

      return res.status(200).json({
        message: "Task updated successfully",
        success: true,
        data: task,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error.message,
        success: false,
        data: null,
      });
    }
  },

  completeTask: async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the task by ID first
      const task = await Task.findById(id);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      // Check if the task is already completed
      if (task.completed) {
        return res.status(400).json({ message: "Task already completed" });
      }
  
      // If not, update the task to mark it as completed
      task.completed = true;
      await task.save();
  
      return res.status(200).json({
        message: "Task updated successfully",
        success: true,
        data: task,
      });
    } catch (error) {
      if (error.name === "CastError") {
        return res.status(400).json({
          message: "Task ID is invalid",
          success: false,
          data: null,
        });
      }
      console.log(error);
      return res.status(500).json({
        message: error.message,
        success: false,
        data: null,
      });
    }
  },
  
  deleteTask: async (req, res) => {
    try {
      const { id } = req.params;

      await Task.findOneAndDelete({ _id: id });
      return res.status(200).json({
        message: "Task deleted successfully",
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error.message,
        success: false,
      });
    }
  },
};

module.exports = taskController;
