import express from 'express';
import { getUserGenerations } from '../Controllers/GenerationController.js';
import authUser from '../Middleware/authUser.js';

const generationRouter = express.Router();

generationRouter.get('/history', authUser, getUserGenerations);

export default generationRouter;