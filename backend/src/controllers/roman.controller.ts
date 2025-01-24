import { Request, Response } from 'express';
import { RomanService } from '../services/roman.service';

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

    // Check if "query" param is provided
    if (!query) {
      res
        .status(400)
        .json({ error: 'Missing required query parameter "query".' });
      return;
    }

    const num = parseInt(query as string, 10);
    if (isNaN(num)) {
      res
        .status(400)
        .json({ error: `Invalid input "${query}". Must be an integer.` });
      return;
    }

    try {
      const output = this.romanService.toRomanNumeral(num);
      res.json({ input: query, output });
    } catch (error) {
      res.status(422).json({ error: (error as Error).message });
    }
  };
}
