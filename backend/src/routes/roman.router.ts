import { Router } from 'express';
import { RomanController } from '../controllers/roman.controller';

const router = Router();
const romanController = new RomanController();

router.get('/', romanController.getRomanNumeral);

export default router;
