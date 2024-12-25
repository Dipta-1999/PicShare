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