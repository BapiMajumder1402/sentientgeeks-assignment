import { Router } from 'express';
import { TaskController } from '../controllers/Task.controller.js';
import { authenticate } from '../middlewares/AuthMiddleware.js';
import { validate } from '../middlewares/validate.js';
import {
  CreateTaskSchema,
  TaskListSchema,
  UpdateTaskSchema,
  CompleteTaskSchema,
} from "../validators/task.validator.js"

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management APIs
 */

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Buy groceries
 *     responses:
 *       201:
 *         description: Task created
 */
router.post('/', authenticate, validate(CreateTaskSchema), TaskController.create);

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: List tasks with pagination, search, and sorting
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by task title
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *         description: Number of tasks per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [createdAt, title]
 *         description: Field to sort by (e.g., createdAt or title)
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order (asc or desc)
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get('/', authenticate, validate(TaskListSchema), TaskController.list);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task title
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *                 example: Update groceries list
 *     responses:
 *       200:
 *         description: Updated task
 */
router.put('/:id', authenticate, validate(UpdateTaskSchema), TaskController.update);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted
 */
router.delete('/:id', authenticate, TaskController.remove);

/**
 * @swagger
 * /api/tasks/{id}/complete:
 *   patch:
 *     summary: Mark task as complete or incomplete
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [completed]
 *             properties:
 *               completed:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Task updated
 */
router.patch('/:id/complete', authenticate, validate(CompleteTaskSchema), TaskController.toggleComplete);

export default router;
