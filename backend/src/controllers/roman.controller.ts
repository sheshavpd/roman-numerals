import { Request, Response } from 'express';
import { RomanService } from '../services/roman.service.js';
import { logger } from '../utils/logger.js';

export class RomanController {
  private romanService: RomanService;

  constructor(romanService?: RomanService) {
    this.romanService = romanService ?? new RomanService();
  }

  /**
   * GET /romannumeral?query=...
   * Converts the given integer to a Roman numeral.
   */
  getRomanNumeral = (req: Request, res: Response): void => {
    const { query } = req.query;
    logger.info(`Received query param: ${query}`);

    if (!query) {
      const error = 'Missing required query parameter "query".';
      logger.error(error);
      res.status(400).json({ error });
      return;
    }

    const num = parseInt(query as string, 10);
    if (isNaN(num)) {
      const error = `Invalid input "${query}". Must be an integer.`;
      logger.error(error);
      res.status(400).json({ error });
      return;
    }

    try {
      const output = this.romanService.toRomanNumeral(num);
      res.json({ input: query, output });
    } catch (error) {
      logger.error((error as Error).message);
      res.status(422).json({ error: (error as Error).message });
    }
  };
}
