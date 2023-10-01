import { testCase } from './index';

import { P_PARAMETER_CREATE, P_PARAMETER_DELETE, P_PARAMETER_LISTED, P_PARAMETER_UPDATE } from '@service';

describe('Role - /api/parameter', () =>
  testCase('Role', [P_PARAMETER_LISTED, P_PARAMETER_CREATE, P_PARAMETER_UPDATE, P_PARAMETER_DELETE]));
