import express from 'express';
import { recommendMovie } from '../controllers/recommendationController.js';

const router = express.Router();

router.post('/', recommendMovie);

export default router;
