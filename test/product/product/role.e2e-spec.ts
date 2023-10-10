import { testCase } from './index';

import { PRODUCT_CREATE, PRODUCT_DETAIL, PRODUCT_DELETE, PRODUCT_LIST, PRODUCT_UPDATE } from '@service';

describe('Role - /api/product', () =>
  testCase('Role', [PRODUCT_CREATE, PRODUCT_DETAIL, PRODUCT_DELETE, PRODUCT_LIST, PRODUCT_UPDATE]));
