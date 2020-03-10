import { RequestParams } from '@elastic/elasticsearch';
import Query from '../interfaces/queries/Query';
import TQueries from '../interfaces/queries/TQueries';
import SearchFilter from '../interfaces/SearchFilter';

export default abstract class QueryBuilder<I extends TQueries> {
  protected query: TQueries;

  private index: string;
  protected terms: string;
  protected aggregations: any;
  protected highlight: any;
  protected searchParams: RequestParams.Search;

  constructor(index: string) {
    this.index = index;

    this.terms = '';
    this.query = {};
    this.searchParams = {};
  }

  setTerms(terms: string) {
    this.terms = terms;
  }

  setQuery(query: any) {
    this.query = query;
  }

  abstract getQuery(): any;

  setAggregations(aggregations: any) {
    this.aggregations = aggregations;
  }

  setHighlight(highlight: any) {
    this.highlight = highlight;
  }

  getSearchParams(): RequestParams.Search {
    this.searchParams = {
      index: this.index,
      body: this.getQuery(),
    };
    return this.searchParams;
  }

  addFilter(filtro: PesquisaFiltro) {
    console.log(filtro);
    const query = this.query.query || {};
    const filter = {
      term: {
        [filtro.campo]: filtro.valor,
      },
    };

    query.bool = query.bool || {};
    query.bool.filter = query.bool.filter || [];
    query.bool.filter.push(filter);

    this.query.query = query;
  }
}
