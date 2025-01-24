import { Router } from 'express';
import { romanNumeralController } from '../controllers/romanNumeralController';

const router = Router();

router.get('/', romanNumeralController);

export default router;
