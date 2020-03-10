import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

interface RequestProperties extends ParamsDictionary {
  id: string;
  token: any;
}

export default interface Request extends Request<RequestProperties> {}
