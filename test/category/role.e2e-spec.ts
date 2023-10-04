import { testCase } from './index';

import {
  CATEGORY_TYPE_CREATE,
  CATEGORY_TYPE_UPDATE,
  CATEGORY_TYPE_DELETE,
  CATEGORY_TYPE_DETAIL,
  CATEGORY_TYPE_LIST,
} from '@service';

describe('Role - /api/code', () =>
  testCase('Role', [
    CATEGORY_TYPE_CREATE,
    CATEGORY_TYPE_UPDATE,
    CATEGORY_TYPE_DELETE,
    CATEGORY_TYPE_LIST,
    CATEGORY_TYPE_DETAIL,
  ]));
