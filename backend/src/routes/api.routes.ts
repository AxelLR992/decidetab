import { Router } from 'express';
import { getSocioeconomicQuestions, getTestItems } from '../controllers/catalog.controller';
import { postCalculateResults } from '../controllers/results.controller';

const router = Router();

router.get('/test-items', getTestItems);
router.get('/socioeconomic-questions', getSocioeconomicQuestions);
router.post('/calculate-results', postCalculateResults);

export default router;
