import {Request, Response} from 'express';
import {getHealthSuggestions} from '../services/geminiService';
import HealthData from '../models/HealthData';

export const provideHealthSuggestions = async (req: Request, res: Response) => {
    const { foodConsumed } = req.body;
  
    const suggestions = await getHealthSuggestions({ foodConsumed });
  
    if (suggestions) {
      res.status(200).json(suggestions);
    } else {
      res.status(500).json({ message: 'Failed to retrieve health suggestions' });
    }
};
export const saveHealthData = async (req: Request, res: Response) => {
    const { userId, foodConsumed, healthSuggestions } = req.body;
  
    const newHealthData = new HealthData({ userId, foodConsumed, healthSuggestions });
  
    try {
      const savedHealthData = await newHealthData.save();
      res.status(201).json(savedHealthData);
    } catch (error) {
      res.status(500).json({ message: 'Failed to save health data', error });
    }
};
  
export const getUserHealthData = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const healthData = await HealthData.find({ userId });
  
    healthData ? res.status(200).json(healthData) : res.status(404).json({ message: 'No health data found' });
};