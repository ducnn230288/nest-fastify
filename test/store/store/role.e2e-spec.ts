import {
    P_STORE_CREATE,
    P_STORE_DELETE,
    P_STORE_DETAIL,
    P_STORE_LISTED,
    P_STORE_UPDATE
} from '@service';
import { testCase } from './index';

describe('Role - /api/store', () => testCase('Role', [
    P_STORE_CREATE,
    P_STORE_DELETE,
    P_STORE_DETAIL,
    P_STORE_LISTED,
    P_STORE_UPDATE
]));