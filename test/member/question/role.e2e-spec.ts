import { testCase } from './index';

import { P_QUESTION_CREATE, P_QUESTION_DELETE, P_QUESTION_DETAIL, P_QUESTION_LISTED, P_QUESTION_TEST_CREATE, P_QUESTION_UPDATE } from '@service';

<<<<<<< HEAD
describe('Role - /api/question', () => testCase('Role', [
    P_QUESTION_CREATE,
    P_QUESTION_TEST_CREATE,
    P_QUESTION_LISTED,
    P_QUESTION_DETAIL,
    P_QUESTION_UPDATE,
    P_QUESTION_DELETE,
]));
=======
describe('Role - /api/question', () => testCase('Role', [P_QUESTION_CREATE, P_QUESTION_TEST_CREATE]));
>>>>>>> 0e8ab6fd370cf79da91d0dec3aca31e7f23e7d43
