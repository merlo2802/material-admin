/**
 * MC4 SRL
 * Santa Cruz - Bolivia
 * project: simulacion
 * date:    10-07-19
 * author:  fmontero
 **/
import {Sort} from './sort';


export class Pageable {
  sort: Sort | undefined;
  pageSize: number | undefined;
  pageNumber: number | undefined;
  offset: number | undefined;
  paged: boolean | undefined;
  unpaged: boolean | undefined;
  constructor() {}
}
