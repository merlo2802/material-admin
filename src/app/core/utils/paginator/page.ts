/**
 * MC4
 * Santa Cruz - Bolivia
 * project: simulacion
 * package:
 * date:    26-02-19
 * author:  fmontero
 **/
import {Sort} from './sort';
import {Pageable} from './pageable';

export class Page {
  content: any[] | undefined;
  pageable: Pageable | undefined;
  last: boolean | undefined;
  totalPages: number | undefined;
  totalElements: number | undefined;
  sort: Sort | undefined;
  first: boolean | undefined;
  numberOfElements: number | undefined;
  size: number | undefined;
  number: number | undefined;
  empty: boolean | undefined;
  offset: number | undefined;
  constructor() {}
}

