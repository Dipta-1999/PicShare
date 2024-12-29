
import { Request, Response } from 'express';
import Favorite from '../models/Favorite';
import Picture from '../models/Picture';
import User from '../models/User';

export const toggleFavorite = async (req: Request, res: Response): Promise<void> => {
    const { pictureId } = req.body;
    const username = req.headers.authorization; // Assuming user ID is passed in the Authorization header.
    console.log("Picture ID:", pictureId);
    console.log("User Name:", username);

    if (!pictureId || !username) {
        res.status(400).json({ error: 'Missing picture ID or user ID' });
        return;
    }

    try {
        const existingFavorite = await Favorite.findOne({ username, pictureId });
        console.log("Existing Favorite:", existingFavorite);
        if (existingFavorite) {
            // Remove favorite
            await Favorite.deleteOne({ _id: existingFavorite._id });
            res.status(200).json({ message: 'Removed from favorites' });
        } else {
            // Add to favorites
            await Favorite.create({ username, pictureId });
            res.status(201).json({ message: 'Added to favorites' });
        }
    } catch (err) {
        console.error('Error toggling favorite:', err);
        res.status(500).json({ error: 'Server error' });
    }
};


export const getFavorites = async (req: Request, res: Response): Promise<void> => {
    const username = req.headers.authorization;
    //const username = req.body;

    if (!username) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    try {
        const favorites = await Favorite.find({ username }).populate('pictureId');
        res.status(200).json(favorites.map(fav => fav.pictureId)); // Return only picture details
    } catch (err) {
        console.error('Error fetching favorites:', err);
        res.status(500).json({ error: 'Server error' });
    }
};