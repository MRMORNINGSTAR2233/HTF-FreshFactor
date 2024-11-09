import express from 'express';
import { provideHealthSuggestions, saveHealthData, getUserHealthData  } from '../controllers/healthController';

const router = express.Router();

router.post('/suggestions', provideHealthSuggestions);
router.post('/save', saveHealthData);
router.get('/:userId', getUserHealthData);

export default router;
