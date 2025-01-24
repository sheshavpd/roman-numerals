import { Request, Response, NextFunction } from 'express';
import {
  httpRequestsTotal,
  httpRequestDurationSeconds,
} from '../utils/metrics.js';

export const metricsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const end = httpRequestDurationSeconds.startTimer();

  res.on('finish', () => {
    const route = req.route?.path || req.path;
    httpRequestsTotal.inc({
      method: req.method,
      route: route,
      status_code: res.statusCode,
    });
    end({
      method: req.method,
      route: route,
      status_code: res.statusCode,
    });
  });

  next();
};
