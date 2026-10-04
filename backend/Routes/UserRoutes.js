import express from 'express';
import { isAuth, loginUser, logoutUser, registerUser } from '../Controllers/UserController.js';
import authUser from '../Middleware/authUser.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);
userRouter.get('/is-auth', authUser, isAuth);


export default userRouter;