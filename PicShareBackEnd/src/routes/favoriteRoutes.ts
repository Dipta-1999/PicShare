import express from 'express';
import { toggleFavorite, getFavorites } from '../controllers/favoriteController';

const router = express.Router();

router.post('/favorite', toggleFavorite); // Toggle favorite
router.get('/favorites', getFavorites);   // Fetch all favorites for a user

export default router;
