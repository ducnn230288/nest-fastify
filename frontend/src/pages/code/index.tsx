import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Drawer, Select, Spin, Tree } from 'antd';
import classNames from 'classnames';
import dayjs from 'dayjs';
import slug from 'slug';

import { Button } from '@core/button';
import { DataTable } from '@core/data-table';
import { Form } from '@core/form';
import { keyRole, renderTitleBreadcrumbs } from '@utils';
import { Code, CodeFacade, CodeTypeFacade, GlobalFacade } from '@store';
import { Arrow, Check, Disable, Edit, Plus, Trash } from '@svgs';
import { EFormRuleType, EFormType, EStatusState, ETableAlign, ETableFilterType, TableRefObject } from '@models';
import { PopConfirm } from '@core/pop-confirm';
import { ToolTip } from '@core/tooltip';

const Page = () => {
  const { user, formatDate } = GlobalFacade();
  const codeTypeFacade = CodeTypeFacade();
  useEffect(() => {
    if (!codeTypeFacade.result?.data) codeTypeFacade.get({});
    return () => { codeFacade.set({isLoading: true, status: EStatusState.idle}) };
  }, []);

  const codeFacade = CodeFacade();
  useEffect(() => {
    renderTitleBreadcrumbs(
      t('pages.Code'),
      [{ title: t('titles.Setting'), link: '', }, { title: t('titles.Code'), link: '' }]
    );
    switch (codeFacade.status) {
      case EStatusState.putFulfilled:
      case EStatusState.putDisableFulfilled:
      case EStatusState.postFulfilled:
      case EStatusState.deleteFulfilled:
        dataTableRef?.current?.onChange(request);
        break;
    }
  }, [codeFacade.status]);

  const request = JSON.parse(codeFacade.queryParams || '{}');
  if (!request.filter || typeof request?.filter === 'string') request.filter = JSON.parse(request?.filter || '{}');
  const { t } = useTranslation();
  const dataTableRef = useRef<TableRefObject>(null);
  return (
    <div className={'container mx-auto grid grid-cols-12 gap-3 px-2.5 pt-2.5'}>
      <Drawer
        title={t(codeFacade.data ? 'pages.Code/Edit' : 'pages.Code/Add', { type: request.filter.type })}
        onClose={() => codeFacade.set({ data: undefined, isVisible: false })}
        open={codeFacade.isVisible}
      >
        <Form
          spinning={codeFacade.isLoading}
          values={{ ...codeFacade.data }}
          className="intro-x"
          columns={[
            {
              title: 'routes.admin.Code.Name',
              name: 'name',
              formItem: {
                col: 6,
                rules: [{ type: EFormRuleType.required }],
                onBlur: (e, form) => {
                  if (e.target.value && !form.getFieldValue('code')) {
                    form.setFieldValue('code', slug(e.target.value).toUpperCase());
                  }
                },
              },
            },
            {
              title: 'titles.Code',
              name: 'code',
              formItem: {
                col: 6,
                rules: [{ type: EFormRuleType.required }, { type: EFormRuleType.max, value: 100 }],
              },
            },
            {
              title: 'routes.admin.user.Description',
              name: 'description',
              formItem: {
                type: EFormType.textarea,
              },
            },
          ]}
          handSubmit={(values: Code) => {
            if (codeFacade.data) codeFacade.put({ ...values, id: codeFacade.data.id, type: request.filter.type });
            else codeFacade.post({ ...values, type: request.filter.type });
          }}
          disableSubmit={codeFacade.isLoading}
          handCancel={() => codeFacade.set({ data: undefined, isVisible: false })}
        />
      </Drawer>
      <div className="col-span-12 md:col-span-4 lg:col-span-3 -intro-x">
        <div className="shadow rounded-xl w-full bg-white overflow-hidden">
          <div className="h-14 flex justify-between items-center border-b border-gray-100 px-4 py-2">
            <h3 className={'font-bold text-lg'}>Type Code</h3>
          </div>
          <Spin spinning={codeTypeFacade.isLoading}>
            <div className="h-[calc(100vh-12rem)] overflow-y-auto relative scroll hidden sm:block">
              <Tree
                blockNode
                showLine
                autoExpandParent
                defaultExpandAll
                switcherIcon={<Arrow className={'w-4 h-4'} />}
                treeData={codeTypeFacade.result?.data?.map((item: any) => ({
                  title: item?.name,
                  key: item?.code,
                  value: item?.code,
                  isLeaf: true,
                  expanded: true,
                  children: [],
                }))}
                titleRender={(data: any) => (<div
                  className={classNames(
                    { 'bg-gray-100': request.filter.type === data.value },
                    'item text-gray-700 font-medium hover:bg-gray-100 flex justify-between items-center border-b border-gray-100 w-full text-left  group',
                  )}
                >
                  <div
                    onClick={() => {
                      request.filter.type = data.value;
                      dataTableRef?.current?.onChange(request);
                    }}
                    className="truncate cursor-pointer flex-1 hover:text-teal-900 item-text px-3 py-1"
                  >
                    {data.title}
                  </div>
                </div>)}
              />
            </div>
            <div className="p-2 sm:p-0 block sm:hidden">
              <Select
                value={request.filter.type}
                className={'w-full'}
                options={codeTypeFacade.result?.data?.map((data) => ({ label: data.name, value: data.code }))}
                onChange={(e) => {
                  request.filter.type = e;
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
              facade={codeFacade}
              ref={dataTableRef}
              pageSizeRender={(sizePage: number) => sizePage}
              pageSizeWidth={'50px'}
              paginationDescription={(from: number, to: number, total: number) =>
                t('routes.admin.Layout.Pagination', { from, to, total })
              }
              columns={[
                {
                  title: 'titles.Code',
                  name: 'code',
                  tableItem: {
                    width: 100,
                    filter: { type: ETableFilterType.search },
                    sorter: true,
                  },
                },
                {
                  title: 'routes.admin.Code.Name',
                  name: 'name',
                  tableItem: {
                    filter: { type: ETableFilterType.search },
                    sorter: true,
                  },
                },
                {
                  title: 'Created',
                  name: 'createdAt',
                  tableItem: {
                    width: 120,
                    filter: { type: ETableFilterType.date },
                    sorter: true,
                    render: (text) => dayjs(text).format(formatDate),
                  },
                },
                {
                  title: 'routes.admin.user.Action',
                  tableItem: {
                    width: 100,
                    align: ETableAlign.center,
                    render: (text: string, data) => (
                      <div className={'flex gap-2'}>
                        {user?.role?.permissions?.includes(keyRole.P_CODE_UPDATE) && (
                          <ToolTip
                            title={t(
                              data.isDisabled ? 'components.datatable.Disabled' : 'components.datatable.Enabled',
                            )}
                          >
                            <PopConfirm
                              title={t(
                                !data.isDisabled
                                  ? 'components.datatable.areYouSureWantDisable'
                                  : 'components.datatable.areYouSureWantEnable',
                              )}
                              onConfirm={() => codeFacade.putDisable({ id: data.id, disable: !data.isDisabled })}
                            >
                              <button
                                title={
                                  t(
                                    data.isDisabled ? 'components.datatable.Disabled' : 'components.datatable.Enabled',
                                  ) || ''
                                }
                              >
                                {data.isDisabled ? (
                                  <Disable className="icon-cud bg-yellow-700 hover:bg-yellow-500" />
                                ) : (
                                  <Check className="icon-cud bg-green-600 hover:bg-green-400" />
                                )}
                              </button>
                            </PopConfirm>
                          </ToolTip>
                        )}
                        {user?.role?.permissions?.includes(keyRole.P_CODE_UPDATE) && (
                          <ToolTip title={t('routes.admin.Layout.Edit')}>
                            <button
                              title={t('routes.admin.Layout.Edit') || ''}
                              onClick={() => codeFacade.getById({ id: data.id })}
                            >
                              <Edit className="icon-cud bg-teal-900 hover:bg-teal-700" />
                            </button>
                          </ToolTip>
                        )}
                        {user?.role?.permissions?.includes(keyRole.P_CODE_DELETE) && (
                          <ToolTip title={t('routes.admin.Layout.Delete')}>
                            <PopConfirm
                              title={t('components.datatable.areYouSureWant')}
                              onConfirm={() => dataTableRef?.current?.handleDelete!(data.id)}
                            >
                              <button title={t('routes.admin.Layout.Delete') || ''}>
                                <Trash className="icon-cud bg-red-600 hover:bg-red-400" />
                              </button>
                            </PopConfirm>
                          </ToolTip>
                        )}
                      </div>
                    ),
                  },
                },
              ]}
              rightHeader={
                <div className={'flex gap-2'}>
                  {user?.role?.permissions?.includes(keyRole.P_CODE_CREATE) && (
                    <Button
                      icon={<Plus className="icon-cud !h-5 !w-5" />}
                      text={t('routes.admin.Layout.Add')}
                      onClick={() => codeFacade.set({ data: undefined, isVisible: true })}
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
