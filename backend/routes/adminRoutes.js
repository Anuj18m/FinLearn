import express from 'express';
import { getPlatformStats, getAllStudents } from '../controllers/adminController.js';
import { auth } from '../middleware/auth.js';
import authorize from '../middleware/authorize.js';

const router = express.Router();

// All routes here require admin access
router.use(auth);
router.use(authorize('admin'));

router.get('/stats', getPlatformStats);
router.get('/users', getAllStudents);

export default router;
