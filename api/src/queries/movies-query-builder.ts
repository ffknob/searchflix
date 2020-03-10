import QueryBuilder from './query-builder';
import MoviesQuery from '../interfaces/queries/MoviesQuery';

export default class MoviesQueryBuilder extends QueryBuilder<MoviesQuery> {
  constructor() {
    super('movies');
  }

  getQuery(): any {
    this.aggregations = {
      'area1/palavra-chave/Área': {
        terms: {
          field: 'area1',
          size: 10,
        },
      },
      'tribunal/palavra-chave/Tribunal': {
        terms: {
          field: 'tribunal.keyword',
          size: 10,
        },
      },
      'relator.keyword/palavra-chave/Relator': {
        terms: {
          field: 'relator.keyword',
          size: 10,
        },
      },
      'ano/intervalo-numerico/Ano': {
        date_histogram: {
          field: 'dtJulg',
          format: 'yyyy',
          calendar_interval: 'year',
          min_doc_count: 1,
          order: {
            _key: 'desc',
          },
        },
      },
      'orgao/palavra-chave/Órgão': {
        terms: {
          field: 'orgao',
          size: 10,
        },
      },
      'estado/palavra-chave/Estado': {
        terms: {
          field: 'estado',
          size: 10,
        },
      },
    };
    super.setAggregations(this.aggregations);

    this.highlight = {
      pre_tags: ['<em>'],
      post_tags: ['</em>'],
      fields: {
        titulo: {},
        texto: {},
      },
    };
    super.setHighlight(this.highlight);

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
          match: {
            texto: this.terms,
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
        aggregations: this.aggregations,
        highlight: this.highlight,
      };
      super.setQuery(query);
    } catch (e) {
      console.log(e);
    }

    return this.query;
  }
}
