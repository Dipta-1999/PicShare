// import { Request, Response } from 'express';
// import Picture from '../models/Picture';
// import User from '../models/User';

// export const getPictures = async (req: Request, res: Response): Promise<void> => {
//     const { page = 1, limit = 10 } = req.query;
//     try {
//         const pictures = await Picture.find()
//             .sort({ createdAt: -1 })
//             .skip((Number(page) - 1) * Number(limit))
//             .limit(Number(limit));
//         res.json(pictures);
//     } catch (err) {
//         res.status(500).json({ error: 'Server error' });
//     }
// };

// export const sharePicture = async (req: Request, res: Response): Promise<void> => {
//     const { title } = req.body;
//     const userId = req.headers.authorization;

//     try {
//         const user = await User.findById(userId);
//         if (!user) {
//             res.status(401).json({ error: 'Unauthorized' });
//             return;
//         }

//         const picture = await Picture.create({
//             url: `/uploads/${req.file?.filename}`,
//             title,
//             sharedBy: user._id,
//         });

//         res.json({ success: true, picture });
//     } catch (err) {
//         res.status(500).json({ error: 'Server error' });
//     }
// };





import { Request, Response } from 'express';
import Picture from '../models/Picture';
import User from '../models/User';

export const uploadPicture = async (req: Request, res: Response): Promise<void> => {
  const { title, username } = req.body;
  if (!req.file || !title) {
    res.status(400).json({ error: 'Invalid data' });
    return;
  }
  const picture = await Picture.create({
    title,
    url: `/uploads/${req.file?.filename}`,
    uploadedBy: username,
  });
  res.status(201).json(picture);
};

export const getPictures = async (req: Request, res: Response) => {
  const pictures = await Picture.find().populate('uploadedBy', req.body.username);
  res.status(200).json(pictures);
};

// export const toggleFavorite = async (req: Request, res: Response): Promise<void> => {
//   const { pictureId, username } = req.body;
//   const picture = await Picture.findById(pictureId);
//   if (!picture) {
//     res.status(404).json({ error: 'Picture not found' });
//     return;
//   }
//   const index = picture.favorites.indexOf(username);
//   if (index > -1) {
//     picture.favorites.splice(index, 1);
//   } else {
//     picture.favorites.push(username);
//   }
//   await picture.save();
//   res.status(200).json(picture);
// };




// Function to toggle a picture's favorite status for the authenticated user
// export const toggleFavorite = async (req: Request, res: Response): Promise<void> => {
//   const { pictureId, username } = req.body;
//   const userId:any = req.headers.authorization; 
//   if (!pictureId) {
//     res.status(400).json({ error: 'Missing picture ID' });
//     return;
//   }

//   try {
//     const picture = await Picture.findById(pictureId);
//     if (!picture) {
//       res.status(404).json({ error: 'Picture not found' });
//       return;
//     }

//     const isFavorited = picture.favorites.includes(userId);

//     if (isFavorited) {
//       //picture.favorites.pull(username); // Remove user from favorites
//       await Picture.findByIdAndUpdate(pictureId, { $pull: { favorites: userId } }); // Remove user from favorites
//     } else {
//       picture.favorites.push(userId); // Add user to favorites
//     }

//     await picture.save();
//     res.status(200).json(picture); // Send successful response with the updated picture
//   } catch (err) {
//     console.error(err); // Log the error for debugging
//     res.status(500).json({ error: 'Server error' }); // Send error response
//   }
// };




// export const toggleFavorite = async (req: Request, res: Response): Promise<void> => {
//   const { pictureId } = req.body;
//   const userId = req.headers.authorization; // Get user ID from authorization header

//   if (!pictureId) {
//     res.status(400).json({ error: 'Missing picture ID' });
//     return;
//   }

//   try {
//     // Check user authorization (replace with your authentication logic)
//     const user = await User.findById(userId);
//     if (!user) {
//       res.status(401).json({ error: 'Unauthorized' });
//       return;
//     }

//     const picture = await Picture.findById(pictureId).populate('favorites'); // Populate favorites with User data

//     if (!picture) {
//       res.status(404).json({ error: 'Picture not found' });
//       return;
//     }

//     const isFavorited = picture.favorites.some((favorite: any) => favorite._id.toString() === user._id.toString()); // Check if user is already favorited (using ObjectIds)

//     if (isFavorited) {
//       await Picture.findByIdAndUpdate(pictureId, { $pull: { favorites: userId } });
//       //picture.favorites.pull(user._id); // Use pull to remove the user's ObjectId
//     } else {
//       picture.favorites.push(user._id); // Add the user's ObjectId
//     }

//     await picture.save();
//     const updatedPicture = await Picture.findById(pictureId).populate('favorites'); // Fetch updated picture with populated favorites
//     res.status(200).json(updatedPicture); // Send successful response with updated picture
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };






// export const toggleFavorite = async (req: Request, res: Response): Promise<void> => {
//   const { pictureId, username } = req.body; // Get username from the request body

//   if (!pictureId || !username) {
//     res.status(400).json({ error: 'Missing picture ID or username' });
//     return;
//   }

//   try {
//     const user = await User.findOne({ username }); // Fetch user using username
//     if (!user) {
//       res.status(401).json({ error: 'Unauthorized' });
//       return;
//     }

//     const picture = await Picture.findById(pictureId); // Find picture by ID
//     if (!picture) {
//       res.status(404).json({ error: 'Picture not found' });
//       return;
//     }

//     const isFavorited = picture.favorites.includes(user._id); // Check if user is already a favorite

//     if (isFavorited) {
//       // Remove user from favorites
//       picture.favorites = picture.favorites.filter(
//         (userId) => userId !== user._id
//       );
//     } else {
//       // Add user to favorites
//       picture.favorites.push(user._id);
//     }

//     await picture.save(); // Save the updated picture
//     const updatedPicture = await Picture.findById(pictureId).populate('favorites'); // Fetch updated picture with populated favorites
//     res.status(200).json(updatedPicture); // Send the updated picture
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };