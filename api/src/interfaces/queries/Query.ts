export default interface Query {
  query?: {
    bool?: {
      filter?: any; //Array<any> | [] | null;
      must?: Array<any> | [] | null;
      should?: Array<any> | [] | null;
    };
  };
  aggregations?: {} | null;
  highlight?: {} | null;
}
