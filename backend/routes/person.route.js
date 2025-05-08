import express from 'express';
import { getPersonDetails,getPersonCombinedCredits,getPersonImages,getPersonMovies,getPersonTVShows } from '../controllers/person.controller.js';
const router = express.Router();

router.get('/:id', getPersonDetails);
router.get('/:id/movies', getPersonMovies);
router.get('/:id/tv', getPersonTVShows);
router.get('/:id/images', getPersonImages);
router.get('/:id/combined-credits', getPersonCombinedCredits);

export default router;