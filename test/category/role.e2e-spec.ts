import { API, testCase } from './index';

import {
  
  P_CATEGORY_CREATE,
  P_CATEGORY_UPDATE,
  P_CATEGORY_FINDONE,
  P_CATEGORY_FINDALL,
  P_CATEGORY_DELETE,
  
} from '@service';

describe('Role -' +  API, () =>
  testCase('Role', [
    P_CATEGORY_CREATE,
    P_CATEGORY_UPDATE,
    P_CATEGORY_DELETE,
    P_CATEGORY_FINDONE,
    P_CATEGORY_FINDALL
  ]));
