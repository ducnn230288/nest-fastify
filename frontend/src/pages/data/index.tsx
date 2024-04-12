import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Select, Spin, Tree } from 'antd';
import { useNavigate } from 'react-router';
import classNames from 'classnames';
import { createSearchParams } from 'react-router-dom';

import { Button } from '@core/button';
import { DataTable } from '@core/data-table';
import { keyRole, lang, renderTitleBreadcrumbs, routerLinks } from '@utils';
import { DataFacade, DataTypeFacade, GlobalFacade } from '@store';
import { Arrow, Plus } from '@svgs';
import { EStatusState, TableRefObject } from '@models';
import _column from '@column/data';
import { DrawerForm } from '@core/drawer';

const Page = () => {
  const { user } = GlobalFacade();
  const dataTypeFacade = DataTypeFacade();
  useEffect(() => {
    if (!dataTypeFacade.result?.data) dataTypeFacade.get({});
    return () => {
      dataFacade.set({ isLoading: true, status: EStatusState.idle });
    };
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    switch (dataTypeFacade.status) {
      case EStatusState.getFulfilled:
        if (
          dataTypeFacade?.result?.data?.length &&
          !dataTypeFacade?.result?.data?.filter((item) => item.code === request.filter.type).length
        ) {
          navigate({
            pathname: `/${lang}${routerLinks('Data')}`,
            search: `?${createSearchParams({ filter: '{"type":"partner"}' })}`,
          });
          request.filter.type = 'partner';
          dataTableRef?.current?.onChange(request);
        }
        break;
    }
  }, [dataTypeFacade?.result]);

  const dataFacade = DataFacade();
  useEffect(() => {
    renderTitleBreadcrumbs(t('pages.Data'), [
      { title: t('titles.Setting'), link: '' },
      { title: t('titles.Data'), link: '' },
    ]);
    switch (dataFacade.status) {
      case EStatusState.putFulfilled:
      case EStatusState.putDisableFulfilled:
      case EStatusState.postFulfilled:
      case EStatusState.deleteFulfilled:
        dataTableRef?.current?.onChange(request);
        break;
    }
  }, [dataFacade.status]);

  const request = JSON.parse(dataFacade.queryParams || '{}');
  if (!request.filter || typeof request?.filter === 'string') request.filter = JSON.parse(request?.filter || '{}');
  const { t } = useTranslation();
  const dataTableRef = useRef<TableRefObject>(null);
  return (
    <div className={'container mx-auto grid grid-cols-12 gap-3 px-2.5 pt-2.5'}>
      <DrawerForm
        size={request.filter.type !== 'partner' && request.filter.type !== 'tech' ? 'large' : undefined}
        facade={dataFacade}
        columns={_column.form(request.filter.type)}
        title={t(dataFacade.data ? 'pages.Data/Edit' : 'pages.Data/Add', { type: request.filter.type })}
        onSubmit={(values) => {
          if (dataFacade.data) dataFacade.put({ ...values, id: dataFacade.data.id, type: request.filter.type });
          else dataFacade.post({ ...values, type: request.filter.type });
        }}
      />
      <div className="col-span-12 md:col-span-4 lg:col-span-3 -intro-x">
        <div className="shadow rounded-xl w-full bg-white overflow-hidden">
          <div className="h-14 flex justify-between items-center border-b border-gray-100 px-4 py-2">
            <h3 className={'font-bold text-lg'}>Data Type</h3>
          </div>
          <Spin spinning={dataTypeFacade.isLoading}>
            <div className="h-[calc(100vh-12rem)] overflow-y-auto relative scroll hidden sm:block">
              <Tree
                blockNode
                showLine
                autoExpandParent
                defaultExpandAll
                switcherIcon={<Arrow className={'w-4 h-4'} />}
                treeData={dataTypeFacade.result?.data?.map((item: any) => ({
                  title: item?.name,
                  key: item?.code,
                  value: item?.code,
                  isLeaf: true,
                  expanded: true,
                  children: [],
                }))}
                titleRender={(data: any) => (
                  <div
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
                  </div>
                )}
              />
            </div>
            <div className="p-2 sm:p-0 block sm:hidden">
              <Select
                value={request.filter.type}
                className={'w-full'}
                options={dataTypeFacade.result?.data?.map((data) => ({ label: data.name, value: data.code }))}
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
              facade={dataFacade}
              ref={dataTableRef}
              paginationDescription={(from: number, to: number, total: number) =>
                t('routes.admin.Layout.Pagination', { from, to, total })
              }
              columns={_column.table()}
              rightHeader={
                <div className={'flex gap-2'}>
                  {user?.role?.permissions?.includes(keyRole.P_DATA_CREATE) && (
                    <Button
                      icon={<Plus className="icon-cud !h-5 !w-5" />}
                      text={t('components.button.New')}
                      onClick={() => dataFacade.set({ data: undefined, isVisible: true })}
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
