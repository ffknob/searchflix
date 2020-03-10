import * as dotenv from 'dotenv';

import apm from 'elastic-apm-node';

import { Client, RequestParams, ApiResponse } from '@elastic/elasticsearch';
//import { SearchResponse } from 'elasticsearch';
import SearchResponse from '../interfaces/elasticsearch/SearchResponse';

dotenv.config();

const client = new Client({
  node: `${process.env.ELASTICSEARCH_PROTOCOL}://${process.env.ELASTICSEARCH_HOST}:${process.env.ELASTICSEARCH_PORT}`,
});

export const search = <Q, I>(
  searchParams: RequestParams.Search
): Promise<ApiResponse<SearchResponse<I>>> => {
  return new Promise<ApiResponse<SearchResponse<I>>>(
    async (resolve, reject) => {
      console.log(JSON.stringify(searchParams));

      try {
        const response: ApiResponse<SearchResponse<I>> = await client.search(
          searchParams
        );
        resolve(response);
      } catch (err) {
        apm.captureError(err);

        reject(err);
      }
    }
  );
};

export const index = <T>(
  indexParams: RequestParams.Index<T>
): Promise<ApiResponse<any>> => {
  return new Promise<ApiResponse<any>>(async (resolve, reject) => {
    console.log(JSON.stringify(indexParams));
    try {
      const response: ApiResponse<any> = await client.index(indexParams);
      resolve(response);
    } catch (err) {
      apm.captureError(err);

      reject(err);
    }
  });
};

export default { search, index };
