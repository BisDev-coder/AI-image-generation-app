import express from 'express';
import { generateImage } from '../Controllers/ImageController.js';
import authUser from '../Middleware/authUser.js';

const imageRouter = express.Router();

imageRouter.post('/generate', authUser, generateImage);

export default imageRouter;


// Why authUser comes before generateImage

// This is important:

// POST /api/image/generate
//           ↓
//       authUser
//           ↓
//    JWT verification
//           ↓
//      req.userId
//           ↓
//    generateImage

// So an unauthenticated person cannot generate images through this API, and the generated history gets associated with the authenticated user.