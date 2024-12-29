
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
