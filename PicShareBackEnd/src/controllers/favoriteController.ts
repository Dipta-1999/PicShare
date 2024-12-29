// import { Request, Response } from 'express';
// import mongoose from 'mongoose';
// import User from '../models/User';

// export const getFavorites = async (req: Request, res: Response): Promise<void> => {
//     const userId = req.headers.authorization;
//     try {
//         const user = await User.findById(userId).populate('favorites');
//         if (!user) {
//             res.status(401).json({ error: 'Unauthorized' });
//             return;
//         }
//         res.json(user.favorites);
//     } catch (err) {
//         res.status(500).json({ error: 'Server error' });
//     }
// };

// export const addFavorite = async (req: Request, res: Response): Promise<void> => {
//     const userId = req.headers.authorization;
//     const { pictureId } = req.params;

//     try {
//         const user = await User.findById(userId);
//         if (!user) {
//             res.status(401).json({ error: 'Unauthorized' });
//             return;
//         }

//         const pictureObjectId = new mongoose.Types.ObjectId(pictureId);

//         if (!user.favorites.some(id => id.equals(pictureObjectId))) {
//             user.favorites.push(pictureObjectId);
//             await user.save();
//         }

//         res.json({ success: true });
//     } catch (err) {
//         if (err instanceof Error && err.name === 'CastError') {
//             res.status(400).json({ error: 'Invalid picture ID format' });
//             return;
//         }
//         res.status(500).json({ error: 'Server error' });
//     }
// };

// export const removeFavorite = async (req: Request, res: Response): Promise<void> => {
//     const userId = req.headers.authorization;
//     const { pictureId } = req.params;

//     try {
//         const user = await User.findById(userId);
//         if (!user) {
//             res.status(401).json({ error: 'Unauthorized' });
//             return;
//         }

//         const pictureObjectId = new mongoose.Types.ObjectId(pictureId);

//         user.favorites = user.favorites.filter(id => !id.equals(pictureObjectId));
//         await user.save();

//         res.json({ success: true });
//     } catch (err) {
//         if (err instanceof Error && err.name === 'CastError') {
//             res.status(400).json({ error: 'Invalid picture ID format' });
//             return;
//         }
//         res.status(500).json({ error: 'Server error' });
//     }
// };


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