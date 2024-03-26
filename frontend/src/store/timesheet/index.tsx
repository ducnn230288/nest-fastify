import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useAppDispatch, useTypedSelector, Action, Slice, State, User } from '@store';
import { CommonEntity, EStatusState, PaginationQuery } from '@models';
import { API, routerLinks } from '@utils';
import { Message } from '@core/message';

const name = 'TimeSheet';
// const action = new Action<TimeSheet>(name);
const action = {
  ...new Action<TimeSheet>(name),
  putCheckin: createAsyncThunk(name + '/putCheckin', async (values: any) => {
    const { works, id, ...rest} = values;
    
    const valuesPut = { ...rest, listTaskWork: values.works.map((work: any) => ({
      id: work.id,
      // sử dụng hàm parseInt() hoặc parseFloat(): Chuyển string thành number 
      hours: parseFloat(work.hours),
    }))};
    const { data, message } = await API.put(`${routerLinks(name, 'api')}`, valuesPut);
    if (message) Message.success({ text: message });
    return data;
  }),
};
export const timesheetSlice = createSlice(
  new Slice<TimeSheet>(action, (builder:any) => {
    builder
      .addCase(action.putCheckin.pending, (state: State<TimeSheet>) => {
        state.isLoading = true;
        state.status = EStatusState.putCheckinPending;
      })
      .addCase(action.putCheckin.fulfilled, (state: State<TimeSheet>, action: PayloadAction<TimeSheet>) => {
        state.data = action.payload;
        state.isLoading = false;
        state.status = EStatusState.putCheckinFulfilled;
      })
      .addCase(action.putCheckin.rejected, (state: State<TimeSheet>) => {
        state.isLoading = false;
        state.status = EStatusState.putCheckinRejected;
      });
  }),
);
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
    put: (values: TimeSheet) => dispatch(action.putCheckin(values)),
    // putCheckin: (values: TimeSheet) => dispatch(action.putCheckin(values)),
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
    public hours?: number,
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
