import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Spin, Tree, TreeSelect } from 'antd';
import classNames from 'classnames';

import { Button } from '@core/button';
import { DataTable } from '@core/data-table';
import { keyRole, renderTitleBreadcrumbs } from '@utils';
import { GlobalFacade, PostFacade, PostTypeFacade } from '@store';
import { Arrow, Edit, Plus, Trash } from '@svgs';
import { EStatusState, TableRefObject } from '@models';
import { PopConfirm } from '@core/pop-confirm';
import { ToolTip } from '@core/tooltip';
import _column from '@column/post';
import _columnType from '@column/post/type';
import { DrawerForm } from '@core/drawer';

const Page = () => {
  const { user } = GlobalFacade();
  const postTypeFacade = PostTypeFacade();
  useEffect(() => {
    if (!postTypeFacade.tree) postTypeFacade.getTree();
    return () => {
      postFacade.set({ isLoading: true, status: EStatusState.idle });
    };
  }, []);

  const postFacade = PostFacade();
  useEffect(() => {
    renderTitleBreadcrumbs(t('titles.Post'), [
      { title: t('titles.Setting'), link: '' },
      { title: t('titles.Post'), link: '' },
    ]);
    switch (postFacade.status) {
      case EStatusState.putFulfilled:
      case EStatusState.putDisableFulfilled:
      case EStatusState.postFulfilled:
      case EStatusState.deleteFulfilled:
        dataTableRef?.current?.onChange(request);
        break;
    }
  }, [postFacade.status]);
  useEffect(() => {
    switch (postTypeFacade.status) {
      case EStatusState.postFulfilled:
      case EStatusState.putFulfilled:
      case EStatusState.deleteFulfilled:
        postTypeFacade.getTree();
        break;
    }
  }, [postTypeFacade.status]);

  const request = JSON.parse(postFacade.queryParams || '{}');
  if (!request.filter || typeof request?.filter === 'string') request.filter = JSON.parse(request?.filter || '{}');
  const { t } = useTranslation();
  const dataTableRef = useRef<TableRefObject>(null);

  return (
    <div className={'container mx-auto grid grid-cols-12 gap-3 px-2.5 pt-2.5'}>
      <DrawerForm
        facade={postTypeFacade}
        columns={_columnType.form(postTypeFacade.data?.id, postTypeFacade.tree)}
        title={t(postTypeFacade.data ? 'pages.Post/Edit' : 'pages.Post/Add', { type: '' })}
        onSubmit={(values) => {
          if (postTypeFacade.data) postTypeFacade.put({ ...values, id: postTypeFacade.data.id });
          else postTypeFacade.post({ ...values });
        }}
      />
      <DrawerForm
        size={'large'}
        facade={postFacade}
        columns={_column.form(postFacade.data?.id)}
        title={t(postFacade.data ? 'pages.Post/Edit' : 'pages.Post/Add', { type: request.filter.type })}
        onSubmit={(values) => {
          if (postFacade.data) postFacade.put({ ...values, id: postFacade.data.id, type: request.filter.type });
          else postFacade.post({ ...values, type: request.filter.type });
        }}
      />
      <div className="col-span-12 md:col-span-4 lg:col-span-3 -intro-x">
        <div className="shadow rounded-xl w-full bg-white overflow-hidden">
          <div className="h-14 flex justify-between items-center border-b border-gray-100 px-4 py-2">
            <h3 className={'font-bold text-lg'}>Post Type</h3>
            <div className="flex items-center">
              <Button
                icon={<Plus className="icon-cud !h-5 !w-5" />}
                text={t('routes.admin.Code.New Type')}
                onClick={() => postTypeFacade.set({ data: undefined, isVisible: true })}
              />
            </div>
          </div>
          <Spin spinning={postTypeFacade.isLoading}>
            <div className="h-[calc(100vh-12rem)] overflow-y-auto relative scroll hidden sm:block">
              <Tree
                blockNode
                showLine
                autoExpandParent
                defaultExpandAll
                switcherIcon={<Arrow className={'w-4 h-4'} />}
                treeData={postTypeFacade.tree}
                titleRender={(data: any) => (
                  <div
                    className={classNames(
                      { 'bg-gray-100': request.filter.type === data.code },
                      'item text-gray-700 font-medium hover:bg-gray-100 flex justify-between items-center border-b border-gray-100 w-full text-left  group',
                    )}
                  >
                    <div
                      onClick={() => {
                        request.filter.type = data.code;
                        dataTableRef?.current?.onChange(request);
                      }}
                      className="truncate cursor-pointer flex-1 hover:text-teal-900 item-text px-3 py-1"
                    >
                      {data.name}
                    </div>
                    <div className="w-16 flex justify-end gap-1">
                      {user?.role?.permissions?.includes(keyRole.P_POST_TYPE_UPDATE) && (
                        <ToolTip title={t('routes.admin.Layout.Edit')}>
                          <button
                            className={'opacity-0 group-hover:opacity-100 transition-all duration-300 '}
                            title={t('routes.admin.Layout.Edit') || ''}
                            onClick={() => postTypeFacade.getById({ id: data.id })}
                          >
                            <Edit className="icon-cud bg-teal-900 hover:bg-teal-700" />
                          </button>
                        </ToolTip>
                      )}
                      {user?.role?.permissions?.includes(keyRole.P_POST_TYPE_DELETE) && !data.isPrimary && (
                        <ToolTip title={t('routes.admin.Layout.Delete')}>
                          <PopConfirm
                            title={t('components.datatable.areYouSureWant')}
                            onConfirm={() => postTypeFacade.delete(data.id!)}
                          >
                            <button
                              className={'opacity-0 group-hover:opacity-100 transition-all duration-300'}
                              title={t('routes.admin.Layout.Delete') || ''}
                            >
                              <Trash className="icon-cud bg-red-600 hover:bg-red-400" />
                            </button>
                          </PopConfirm>
                        </ToolTip>
                      )}
                    </div>
                  </div>
                )}
              />
            </div>
            <div className="p-2 sm:p-0 block sm:hidden">
              <TreeSelect
                value={request.filter.type}
                className={'w-full'}
                treeData={postTypeFacade.tree}
                onChange={(e) => {
                  if (request.filter.type !== e) request.filter.type = e;
                  else delete request.filter.type;
                  dataTableRef?.current?.onChange(request);
                }}
              />
            </div>
          </Spin>
        </div>
      </div>
      <div className="col-span-12 md:col-span-8 lg:col-span-9 intro-x">
        <div className="shadow rounded-xl w-full overflow-auto bg-white">
          <div className="sm:min-h-[calc(100vh-8.5rem)] overflow-y-auto p-3">
            <DataTable
              facade={postFacade}
              ref={dataTableRef}
              paginationDescription={(from: number, to: number, total: number) =>
                t('routes.admin.Layout.Pagination', { from, to, total })
              }
              columns={_column.table()}
              rightHeader={
                <div className={'flex gap-2'}>
                  {user?.role?.permissions?.includes(keyRole.P_POST_CREATE) && (
                    <Button
                      icon={<Plus className="icon-cud !h-5 !w-5" />}
                      text={t('components.button.New')}
                      onClick={() => postFacade.set({ data: undefined, isVisible: true })}
                    />
                  )}
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
