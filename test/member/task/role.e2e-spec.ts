import { testCase } from './index';

import { P_TASK_CREATE, P_TASK_DELETE, P_TASK_DETAIL, P_TASK_LISTED, P_TASK_UPDATE } from '@service';

describe('Role - /api/task', () =>
  testCase('Role', [P_TASK_LISTED, P_TASK_DETAIL, P_TASK_CREATE, P_TASK_UPDATE, P_TASK_DELETE]));
