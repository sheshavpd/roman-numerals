import { Router } from 'express';
import { RomanController } from '../controllers/roman.controller.js';

const router = Router();
const romanController = new RomanController();

router.get('/', romanController.getRomanNumeral);

export default router;
