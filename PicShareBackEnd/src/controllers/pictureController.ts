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

export const toggleFavorite = async (req: Request, res: Response): Promise<void> => {
  const { pictureId, username } = req.body;
  const picture = await Picture.findById(pictureId);
  if (!picture) {
    res.status(404).json({ error: 'Picture not found' });
    return;
  }
  const index = picture.favorites.indexOf(username);
  if (index > -1) {
    picture.favorites.splice(index, 1);
  } else {
    picture.favorites.push(username);
  }
  await picture.save();
  res.status(200).json(picture);
};
