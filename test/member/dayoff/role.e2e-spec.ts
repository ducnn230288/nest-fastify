import { testCase } from './index';

import {
  P_DAYOFF_LISTED,
  P_DAYOFF_DETAIL,
  P_DAYOFF_CREATE,
  P_DAYOFF_UPDATE,
  P_DAYOFF_DELETE,
  P_DAYOFF_UPDATE_STATUS,
  P_DAYOFF_EXPORT_EXCEL,
} from '@service';

describe('Role - /api/dayoff', () =>
  testCase('Role', [
    P_DAYOFF_LISTED,
    P_DAYOFF_DETAIL,
    P_DAYOFF_CREATE,
    P_DAYOFF_UPDATE,
    P_DAYOFF_DELETE,
    P_DAYOFF_UPDATE_STATUS,
    P_DAYOFF_EXPORT_EXCEL,
  ]));
