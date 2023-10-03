import { testCase } from './index';

import { CATEGORY_TYPE_CREATE, CATEGORY_TYPE_UPDATE } from '@service';

describe('Role - /api/code', () => testCase('Role', [CATEGORY_TYPE_CREATE, CATEGORY_TYPE_UPDATE]));
