import express from 'express';

import { searchMovies, searchTvs, searchPerson, getSearchHistory, deleteSearchHistory, deleteAllSearchHistory } from '../controllers/search.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
const router = express.Router();


router.get('/movie/:query',  searchMovies);
router.get('/tv/:query',  searchTvs);
router.get('/person/:query',  searchPerson);
router.get("/history",  getSearchHistory);
router.delete("/history/:id",  deleteSearchHistory);
router.delete("/history",  deleteAllSearchHistory);


export default router;