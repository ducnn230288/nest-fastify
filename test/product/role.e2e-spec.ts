import { testCase } from './index';

import { PRODUCT_TYPE_CREATE, PRODUCT_TYPE_DETAIL } from '@service';

describe('Role - /api/product', () => testCase('Role', [PRODUCT_TYPE_CREATE, PRODUCT_TYPE_DETAIL]));
