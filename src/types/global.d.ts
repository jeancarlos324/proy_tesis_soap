import type { Request, Router, Response, NextFunction } from 'express';

export interface IControllerFunction {
  (req: Request, res: Response, next: NextFunction): Promise<void>;
}

export interface IRoutePaths {
  path: string;
  router: Router;
}

export interface IPagination {
  page: number;
  limit: number;
  offset: number;
}
