import express from 'express';

import { searchMovies, searchTvs, searchPerson, getSearchHistory, deleteSearchHistory, deleteAllSearchHistory } from '../controllers/search.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
const router = express.Router();


router.get('/movie/:query', verifyToken, searchMovies);
router.get('/tv/:query', verifyToken, searchTvs);
router.get('/person/:query', verifyToken, searchPerson);
router.get("/history", verifyToken, getSearchHistory);
router.delete("/history/:id", verifyToken, deleteSearchHistory);
router.delete("/history", verifyToken, deleteAllSearchHistory);


export default router;