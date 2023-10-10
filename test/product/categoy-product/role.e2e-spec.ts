import { testCase } from './index';

import { CATEGORY_CREATE, CATEGORY_UPDATE, CATEGORY_DELETE, CATEGORY_DETAIL, CATEGORY_LIST } from '@service';

describe('Role - /api/product-category', () =>
  testCase('Role', [CATEGORY_CREATE, CATEGORY_UPDATE, CATEGORY_DELETE, CATEGORY_LIST, CATEGORY_DETAIL]));
