import { testCase } from './index';

import { P_BOOKING_LISTED, P_BOOKING_DETAIL, P_BOOKING_CREATE, P_BOOKING_UPDATE, P_BOOKING_DELETE } from '@service';

describe('Role - /api/booking', () =>
  testCase('Role', [P_BOOKING_LISTED, P_BOOKING_DETAIL, P_BOOKING_CREATE, P_BOOKING_UPDATE, P_BOOKING_DELETE]));
