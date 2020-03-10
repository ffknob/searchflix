import { Router, Response, Request, NextFunction } from 'express';

//import { SearchResponse } from 'elasticsearch';
import SearchResponse from '../interfaces/elasticsearch/SearchResponse';

import searchController from '../controllers/search';

import SearchResults from '../interfaces/SearchResults';
import SearchParameters from '../interfaces/SearchParameters';
import MoviesIndice from '../interfaces/indices/MoviesIndice';
import MoviesQuery from '../interfaces/queries/MoviesQuery';
import BackendError from '../models/BackendError';

import logger from '../services/logger';

import requestLimit from '../middlewares/rateLimit';

const router = Router();

router.post(
  '/:index',
  (req: Request, res: Response, next: NextFunction) => {
    const options = {};
    const rateLimit = requestLimit(req, res, next, options);
    rateLimit(req, res, next);
  },
  (req: Request, res: Response, next: NextFunction) => {
    logger.debug(req);

    const user = req.user;
    const index: string = req.params.index;
    const parameters: SearchParameters = req.body.parameters;

    if (user) {
      searchController
        .search<MoviesQuery, MoviesIndice>(user, parameters)
        .then((resultado: SearchResults<SearchResponse<MoviesIndice>>) =>
          res.status(200).json(resultado)
        )
        .catch((err: Error) =>
          next(
            new BackendError(
              500,
              'An error occurred trying to executethe search: ' + err
            )
          )
        );
    } else {
      next(new BackendError(401, 'You are not authorized'));
    }
  }
);

export default router;
