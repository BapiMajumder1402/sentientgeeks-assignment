import { asyncHandler } from '../utils/asyncHandler.js';
import { AuthService } from '../services/Auth.service.js'; 
import { generateToken } from '../utils/jwt.js';

export class AuthController {
static register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await AuthService.register(name, email, password);

  const userObj = user.toObject();
  const { password: _pwd, ...userWithoutPassword } = userObj;

  res.status(201).json({
    success: true,
    message: "User registration done successfully.",
    user: userWithoutPassword,
  });
});


  static login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await AuthService.login(email, password);
    const token = generateToken(user._id );
    const userObj = user.toObject();
    const { password: _pwd, ...userWithoutPassword } = userObj;
    res.json({ success: true, token , user:{...userWithoutPassword} });
  });
}
