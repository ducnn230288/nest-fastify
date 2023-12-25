import { P_CATEGORY_CREATE, P_CATEGORY_DELETE, P_CATEGORY_DETAIL, P_CATEGORY_LISTED, P_CATEGORY_UPDATE } from '@service';
import { testCase } from './index';

describe('Role - /api/category', () => testCase('Role',
    [
        P_CATEGORY_CREATE,
        P_CATEGORY_DELETE,
        P_CATEGORY_DETAIL,
        P_CATEGORY_LISTED,
        P_CATEGORY_UPDATE,
    ])
);