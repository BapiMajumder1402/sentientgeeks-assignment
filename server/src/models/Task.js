import { Schema, model, Document, Types } from 'mongoose';



const TaskSchema = new Schema({
  title: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  completed: { type: Boolean, default: false }
}, { timestamps: true });

export const Task = model('Task', TaskSchema);