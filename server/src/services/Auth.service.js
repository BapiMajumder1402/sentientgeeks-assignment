import { User } from '../models/User.js';
import bcrypt from 'bcryptjs';
import { AppError } from '../utils/AppError.js';

export class AuthService {

  static async register(name, email, password) {
    const existing = await User.findOne({ email });
    if (existing) throw new AppError('Email already in use', 400);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    return user;
  }

  static async login(email, password) {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AppError('Invalid email or password', 404);
    }
    return user;
  }
}
