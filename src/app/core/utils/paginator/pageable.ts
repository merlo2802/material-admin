/**
 * MC4 SRL
 * Santa Cruz - Bolivia
 * project: simulacion
 * date:    10-07-19
 * author:  fmontero
 **/
import {Sort} from './sort';


export class Pageable {
  sort: Sort;
  pageSize: number;
  pageNumber: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
  constructor() {}
}
