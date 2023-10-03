import { testCase } from './index';

import { STORE_LISTED, STORE_DETAIL, STORE_CREATE, STORE_UPDATE, STORE_DELETE } from '@service';

describe('Role - /api/store', () =>
  testCase('Role', [STORE_LISTED, STORE_DETAIL, STORE_CREATE, STORE_UPDATE, STORE_DELETE]));
