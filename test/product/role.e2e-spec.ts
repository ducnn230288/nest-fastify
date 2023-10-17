import { testCase } from './index';

import {
  PRODUCT_CREATE,
  PRODUCT_DETAIL,
  PRODUCT_DELETE,
  PRODUCT_LIST,
  PRODUCT_UPDATE,
  STORE_CREATE,
  STORE_UPDATE,
  STORE_DELETE,
  CATEGORY_CREATE,
  CATEGORY_UPDATE,
  CATEGORY_DELETE,
  CATEGORY_DETAIL,
  CATEGORY_LIST,
} from '@service';

describe('Role - /api/product', () =>
  testCase('Role', [
    // permission product
    PRODUCT_CREATE,
    PRODUCT_DETAIL,
    PRODUCT_DELETE,
    PRODUCT_LIST,
    PRODUCT_UPDATE,
    // permission product-store
    STORE_CREATE,
    STORE_UPDATE,
    STORE_DELETE,
    // permission product-category
    CATEGORY_CREATE,
    CATEGORY_UPDATE,
    CATEGORY_DELETE,
    CATEGORY_DETAIL,
    CATEGORY_LIST,
  ]));
