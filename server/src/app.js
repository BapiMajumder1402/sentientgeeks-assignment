import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import taskRoutes from "./routes/task.routes.js"
import { errorHandler } from './middlewares/ErrorMiddleware.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger/index.js'; 


dotenv.config();

const app = express();

// Middleware Setup
app.use(helmet()); // Secures HTTP headers
app.use(cors()); // Enables CORS
app.use(morgan('dev')); // Logs HTTP requests
app.use(express.json()); // Parses incoming JSON requests
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Route Handlers
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;