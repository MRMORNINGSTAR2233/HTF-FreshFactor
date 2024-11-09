import { Request, Response } from 'express';
import User from '../models/User';

export const getUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  user ? res.status(200).json(user) : res.status(404).json({ message: 'User not found' });
};
