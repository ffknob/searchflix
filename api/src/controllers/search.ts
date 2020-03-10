import uuid from 'uuid';

import { ApiResponse } from '@elastic/elasticsearch';
//import { SearchResponse } from 'elasticsearch';
import SearchResponse from '../interfaces/elasticsearch/SearchResponse';

import MoviesQueryBuilder from '../queries/movies-query-builder';

import Base from '../interfaces/frontend/Base';
import SearchParameters from '../interfaces/SearchParameters';
import SearchResults from '../interfaces/SearchResults';
import User from '../interfaces/User';

import * as elasticsearch from '../services/elasticsearch';

const search = <Q, I>(
  user: User,
  parameters: SearchParameters
): Promise<SearchResults<SearchResponse<I>>> => {
  return new Promise<SearchResults<SearchResponse<I>>>((resolve, reject) => {
    const queryBuilder = new MoviesQueryBuilder();
    queryBuilder.setTerms(parameters.terms);

    if (parameters.filters) {
      parameters.filters.forEach(f => queryBuilder.addFilter(f));
    }

    elasticsearch
      .search<Q, I>(queryBuilder.getSearchParams())
      .then(async (searchResults: ApiResponse<SearchResponse<I>>) => {
        const response: SearchResults<SearchResponse<I>> = {
          id: uuid.v4(),
          success: true,
          data: searchResults.body,
        };

        resolve(response);
      });
  });
};

export default { search };
