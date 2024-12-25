import { Request, Response } from 'express';
import User from '../models/User';

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.body;
  if (!username) {
    res.status(400).json({ error: 'Username is required' });
  }
  let user = await User.findOne({ username });
  if (!user) {
    user = await User.create({ username });
  }
  res.status(200).json(user);
};
