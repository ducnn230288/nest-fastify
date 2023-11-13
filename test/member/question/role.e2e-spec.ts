import { testCase } from './index';

import {
  P_QUESTION_CREATE,
  P_QUESTION_DELETE,
  P_QUESTION_DETAIL,
  P_QUESTION_LISTED,
  P_QUESTION_TEST_CREATE,
  P_QUESTION_UPDATE,
} from '@service';

describe('Role - /api/question', () =>
  testCase('Role', [
    P_QUESTION_CREATE,
    P_QUESTION_TEST_CREATE,
    P_QUESTION_LISTED,
    P_QUESTION_DETAIL,
    P_QUESTION_UPDATE,
    P_QUESTION_DELETE,
  ]));
