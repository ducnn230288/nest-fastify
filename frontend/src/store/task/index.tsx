import { createSlice } from '@reduxjs/toolkit';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { CommonEntity, PaginationQuery } from '@models';
import { type Dayjs } from 'dayjs';

const name = 'Task';
const action = new Action<Task>(name);
export const taskSlice = createSlice(new Slice<Task>(action));

export const TaskFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<Task>),
    set: (values: State<Task>) => dispatch(action.set(values)),
    get: (params: PaginationQuery<Task>) => dispatch(action.get(params)),
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState?: keyof State<Task> }) =>
      dispatch(action.getById({ id, keyState })),
    post: (values: Task) => dispatch(action.post(values)),
    put: (values: Task) => dispatch(action.put(values)),
    delete: (id: string) => dispatch(action.delete(id)),
  };
};

export class Task extends CommonEntity {
  constructor(
    public id: string,
    public name: string,
    public level: number,
    public start?: string,
    public deadline?: string,
    public assignee?: string,
    public assigneeIds?: any,
    public status?: number,
    public priority?: number,
    public planned?: number,
    public work?: number,
    public startDate?: Dayjs,
    public endDate?: Dayjs,
    public percent?: number,
    public success?: string,
    public complete?: number,
  ) {
    super();
  }
}
