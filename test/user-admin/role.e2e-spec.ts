import {
  P_USER_ADMIN_LISTED,
  P_USER_ADMIN_DETAIL,
  P_USER_ADMIN_CREATE,
  P_USER_ADMIN_UPDATE,
  P_USER_ADMIN_DELETE,
} from '@service';
import { testCase } from './index';

describe('Role - /api/user-admin', () =>
  testCase('Role', [
    P_USER_ADMIN_LISTED,
    P_USER_ADMIN_DETAIL,
    P_USER_ADMIN_CREATE,
    P_USER_ADMIN_UPDATE,
    P_USER_ADMIN_DELETE,
  ]));
