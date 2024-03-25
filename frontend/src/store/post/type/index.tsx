import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';

import { CommonEntity, EStatusState, PaginationQuery, Responses } from '@models';
import { API, mapTreeObject, routerLinks } from '@utils';
import { Post } from '../';

const name = 'PostType';
const action = {
  ...new Action<PostType, EStatusPostType>(name),
  getTree: createAsyncThunk(name + '/getTree', async () => await API.get<PostType>(`${routerLinks(name, 'api')}/tree`)),
};
export const postTypeSlice = createSlice(
  new Slice<PostType, EStatusPostType>(action, { keepUnusedDataFor: 9999 }, (builder) => {
    builder
      .addCase(
        action.getTree.pending,
        (
          state: StatePostType<PostType>,
          action: PayloadAction<undefined, string, { arg: PostType; requestId: string; requestStatus: 'pending' }>,
        ) => {
          state.time = new Date().getTime() + (state.keepUnusedDataFor || 60) * 1000;
          state.queryParams = JSON.stringify(action.meta.arg);
          state.isLoading = true;
          state.status = EStatusPostType.getTreePending;
        },
      )
      .addCase(
        action.getTree.fulfilled,
        (state: StatePostType<PostType>, action: PayloadAction<Responses<PostType[]>>) => {
          if (action.payload.data) {
            state.tree = action.payload.data.map((i) => mapTreeObject(i));
            state.status = EStatusPostType.getTreeFulfilled;
          } else state.status = EStatusState.idle;
          state.isLoading = false;
        },
      )
      .addCase(action.getTree.rejected, (state: StatePostType<PostType>) => {
        state.status = EStatusPostType.getTreeRejected;
        state.isLoading = false;
      });
  }),
);
export const PostTypeFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...useTypedSelector((state) => state[action.name] as StatePostType<PostType>),
    set: (values: StatePostType<PostType>) => dispatch(action.set(values)),
    get: (params: PaginationQuery<PostType>) => dispatch(action.get(params)),
    getTree: () => dispatch(action.getTree()),
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState?: keyof StatePostType<PostType> }) =>
      dispatch(action.getById({ id, keyState })),
    post: (values: PostType) => dispatch(action.post(values)),
    put: (values: PostType) => dispatch(action.put(values)),
    putDisable: (values: { id: string; disable: boolean }) => dispatch(action.putDisable(values)),
    delete: (id: string) => dispatch(action.delete(id)),
  };
};
interface StatePostType<T> extends State<T, EStatusPostType> {
  tree?: PostType[];
}
export enum EStatusPostType {
  getTreePending = 'getTree.pending',
  getTreeFulfilled = 'getTree.fulfilled',
  getTreeRejected = 'getTree.rejected',
}
export class PostType extends CommonEntity {
  constructor(
    public name: string,
    public code: string,
    public isPrimary?: boolean,
    public createdAt?: string,
    public updatedAt?: string,
    public items?: Post[],
    public children?: PostType[],
  ) {
    super();
  }
}
