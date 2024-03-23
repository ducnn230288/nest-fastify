import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';

import { API, routerLinks } from '@utils';
import { Message } from '@core/message';
import { CommonEntity, EStatusState, PaginationQuery, Responses } from '@models';
import { State } from '@store';

export class Action<T extends CommonEntity, Y = EStatusState> {
  public name: string;
  public set: AsyncThunk<State<T, Y>, State<T, Y>, object>;
  public get: AsyncThunk<Responses<T[]>, PaginationQuery<T>, object>;
  public getById: AsyncThunk<
    { data: T | undefined; keyState: keyof State<T, Y> },
    { id: string; keyState: keyof State<T, Y> },
    object
  >;
  public post: AsyncThunk<T | undefined, T, object>;
  public put: AsyncThunk<T | undefined, T, object>;
  public putDisable: AsyncThunk<T | undefined, { id: string; disable: boolean }, object>;
  public delete: AsyncThunk<T | undefined, string, object>;
  constructor(name: string) {
    this.name = name;
    this.set = createAsyncThunk(name + '/set', async (values: State<T, Y>) => values);
    this.get = createAsyncThunk(
      name + '/get',
      async (params: PaginationQuery<T>) => await API.get(`${routerLinks(name, 'api')}`, params),
    );
    this.getById = createAsyncThunk(
      name + '/getById',
      async ({ id, keyState = 'isVisible' }: { id: string; keyState: keyof State<T, Y> }) => {
        const { data } = await API.get<T>(`${routerLinks(name, 'api')}/${id}`);
        return { data, keyState };
      },
    );
    this.post = createAsyncThunk(name + '/post', async (values: T) => {
      const { data, message } = await API.post<T>(`${routerLinks(name, 'api')}`, values);
      if (message) await Message.success({ text: message });
      return data;
    });
    this.put = createAsyncThunk(name + '/put', async ({ id, ...values }: T) => {
      const { data, message } = await API.put<T>(`${routerLinks(name, 'api')}/${id}`, values);
      if (message) await Message.success({ text: message });
      return data;
    });
    this.putDisable = createAsyncThunk(
      name + '/putDisable',
      async ({ id, disable }: { id: string; disable: boolean }) => {
        const { data, message } = await API.put<T>(`${routerLinks(name, 'api')}/${id}/disable/${disable}`, {});
        if (message) await Message.success({ text: message });
        return data;
      },
    );
    this.delete = createAsyncThunk(name + '/delete', async (id: string) => {
      const { data, message } = await API.delete<T>(`${routerLinks(name, 'api')}/${id}`);
      if (message) await Message.success({ text: message });
      return data;
    });
  }
}
