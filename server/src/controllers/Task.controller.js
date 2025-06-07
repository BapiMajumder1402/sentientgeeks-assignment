import { asyncHandler } from '../utils/asyncHandler.js';
import { TaskService } from '../services/Task.service.js';

export class TaskController {
  // Create a new task
  static create = asyncHandler(async (req, res) => {
    const { title } = req.body;
    const task = await TaskService.create(req.userId, title);
    res.status(201).json({ success: true, task });
  });

  // List tasks with pagination and search
static list = asyncHandler(async (req, res) => {
  const { search = '', page = '1', limit = '10', sortBy = 'createdAt', order = 'desc' } = req.query;

  const result = await TaskService.list(
    req.userId,
    String(search),
    Number(page),
    Number(limit),
    String(sortBy),
    String(order)
  );

  res.status(200).json({
    success: true,
    message: 'Tasks fetched successfully',
    ...result
  });
});


  // Update task title
  static update = asyncHandler(async (req, res) => {
    const { title } = req.body;
    const task = await TaskService.update(req.params.id, req.userId, title);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.json({ success: true, task });
  });

  // Delete task
  static remove = asyncHandler(async (req, res) => {
    const task = await TaskService.delete(req.params.id, req.userId);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.json({ success: true, message: 'Task deleted successfully' });
  });

  // Mark task as complete/incomplete
  static toggleComplete = asyncHandler(async (req, res) => {
    const { completed } = req.body; 
    const task = await TaskService.toggleComplete(req.params.id, req.userId, completed);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.json({ success: true, task });
  });
}
