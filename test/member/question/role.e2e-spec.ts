import { testCase } from './index';

import { P_QUESTION_CREATE, P_QUESTION_TEST_CREATE } from '@service';

describe('Role - /api/question', () => testCase('Role', [P_QUESTION_CREATE, P_QUESTION_TEST_CREATE]));
