import {Request, Response} from 'express';
import { generateRecipe } from '../services/geminiService';

export const createRecipe = async (req: Request, res: Response) => {
    const {ingredients} = req.body;

    const recipe = await generateRecipe({ingredients});

    if(recipe){
        res.status(200).json(recipe);
    }else{
        res.status(500).json({message: 'Error fetching recipe data'});
    }
};