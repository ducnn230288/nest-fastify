import { createSlice } from '@reduxjs/toolkit';
import { useAppDispatch, useTypedSelector, Action, Slice, State, User } from '@store';
import { CommonEntity, PaginationQuery } from '@models';

const name = 'TimeSheet';
const action = new Action<TimeSheet>(name);
export const TimeSheetSlice = createSlice(new Slice<TimeSheet>(action, { keepUnusedDataFor: 9999 }));
export const TimeSheetFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...useTypedSelector((state) => state[action.name] as State<TimeSheet>),
    set: (values: State<TimeSheet>) => dispatch(action.set(values)),
    get: (params: PaginationQuery<TimeSheet>) => dispatch(action.get(params)),
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState?: keyof State<TimeSheet> }) =>
      dispatch(action.getById({ id, keyState })),
    post: (values: TimeSheet) => dispatch(action.post(values)),
    put: (values: TimeSheet) => dispatch(action.put(values)),
    putDisable: (values: { id: string; disable: boolean }) => dispatch(action.putDisable(values)),
    delete: (id: string) => dispatch(action.delete(id)),
  };
};

export class TimeSheet extends CommonEntity {
  constructor(
    public id?: string,
    public isDisabled?: string,
    public createdAt?: string,
    public updatedAt?: string,
    public start?: string,
    public finish?: string,
    public note?: string,
    public user?: User,
    public works?: Work[],
    public dayoff?: string,
  ) {
    super();
  }
}
export class Work extends CommonEntity {
  constructor(
    public id?: string,
    public isDisabled?: string,
    public createdAt?: string,
    public updatedAt?: string,
    public hours?: string,
    public taskId?: string,
    public timesheetId?: string,
    public task?: {
      id?: string;
      isDisabled?: string;
      createdAt?: string;
      updatedAt?: string;
      projectCode?: string;
      code?: string;
      name?: string;
      start?: string;
      finish?: string;
      deadline?: string;
      priority?: string;
      status?: string;
      level?: string;
      order?: string;
      complete?: string;
      successors?: string;
      predecessors?: string;
      managerId?: string;
      project?: {
        id?: string;
        isDisabled?: string;
        createdAt?: string;
        updatedAt?: string;
        code?: string;
        type?: string;
        name?: string;
        description?: string;
      };
    },
  ) {
    super();
  }
}
