import {
    P_PRODUCT_CREATE,
    P_PRODUCT_DELETE,
    P_PRODUCT_DETAIL,
    P_PRODUCT_LISTED,
    P_PRODUCT_UPDATE
} from '@service';
import { testCase } from './index';

describe('Role - /api/product', () => testCase('Role', [
    P_PRODUCT_LISTED,
    P_PRODUCT_DETAIL,
    P_PRODUCT_CREATE,
    P_PRODUCT_UPDATE,
    P_PRODUCT_DELETE
]));