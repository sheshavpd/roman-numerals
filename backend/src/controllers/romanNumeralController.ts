import { RequestHandler } from 'express';
import { toRomanNumeral } from '../services/romanNumeralService';

export const romanNumeralController: RequestHandler = (req, res): void => {
  const { query } = req.query;
  if (!query) {
    res.status(400).send('Missing required query parameter "query".');
    return;
  }

  const num = parseInt(query as string, 10);
  if (isNaN(num)) {
    res.status(400).send(`Invalid input: "${query}". Must be an integer.`);
    return;
  }

  try {
    const roman = toRomanNumeral(num);
    res.json({ input: query, output: roman });
  } catch (error) {
    res.status(422).send((error as Error).message);
  }
};
