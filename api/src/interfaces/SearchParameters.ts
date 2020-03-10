import User from './User';
import SearchFilter from './SearchFilter';

export default interface SearchParameters {
  user: User | null;
  terms: string;
  filters: Array<SearchFilter> | null;
}
