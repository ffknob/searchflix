import QueryBuilder from './query-builder';
import PesquisasRealizadasQuery from '../interfaces/queries/PesquisasRealizadasQuery';

export default class JurisprudenciaQueryBuilder extends QueryBuilder<
  PesquisasRealizadasQuery
> {
  constructor() {
    super('pesquisas-realizadas');
  }

  getQuery(): any {
    try {
      let filter = [];
      if (
        this.query.query &&
        this.query.query.bool &&
        this.query.query.bool.filter
      ) {
        filter = this.query.query.bool.filter;
      }

      let should = [];
      if (
        this.query.query &&
        this.query.query.bool &&
        this.query.query.bool.should
      ) {
        should = this.query.query.bool.should;
      }

      const must = [
        {
          multi_match: {
            query: this.terms,
            type: 'bool_prefix',
            fields: [
              'search_as_you_type',
              'search_as_you_type._2gram',
              'search_as_you_type._3gram',
            ],
          },
        },
      ];

      const query = {
        query: {
          bool: {
            filter: filter,
            should: should,
            must: must,
          },
        },
      };
      super.setQuery(query);
    } catch (e) {
      console.log(e);
    }

    return this.query;
  }
}
