import { testCase } from './index';

import {
  P_USER_TEAM_LISTED,
  P_USER_TEAM_DETAIL,
  P_USER_TEAM_CREATE,
  P_USER_TEAM_UPDATE,
  P_USER_TEAM_DELETE,
} from '@service';

describe('Role - /api/user-team', () =>
  testCase('Role', [
    P_USER_TEAM_LISTED,
    P_USER_TEAM_DETAIL,
    P_USER_TEAM_CREATE,
    P_USER_TEAM_UPDATE,
    P_USER_TEAM_DELETE,
  ]));
