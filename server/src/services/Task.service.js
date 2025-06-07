import { Task } from '../models/Task.js';

export class TaskService {

  static async create(userId, title) {
    return await Task.create({ user: userId, title });
  }

static async list(userId, search = '', page = 1, limit = 10) {
  const query = {
    user: userId,
    title: { $regex: new RegExp(search, 'i') },
  };

  const tasks = await Task.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Task.countDocuments(query);
  const totalPages = Math.ceil(total / limit);

  return {
    tasks,
    total,
    totalPages,
    currentPage: page,
    limit,
  };
}



  static async update(taskId, userId, title) {
    return await Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      { title, updatedAt: Date.now() },
      { new: true }
    );
  }


  static async delete(taskId, userId) {
    return await Task.findOneAndDelete({ _id: taskId, user: userId });
  }


  static async toggleComplete(taskId, userId, isCompleted) {
    return await Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      { completed: isCompleted },
      { new: true }
    );
  }
}
