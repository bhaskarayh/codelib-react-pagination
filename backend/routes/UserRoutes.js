import express from 'express';
import { getUser } from '../controller/UserController.js';

const router = express.Router();

router.get('/users', getUser);

export default router;
