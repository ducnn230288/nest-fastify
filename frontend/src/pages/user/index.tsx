import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Select, Spin, Tree } from 'antd';

import { Button } from '@core/button';
import { DataTable } from '@core/data-table';

import { EStatusState, TableRefObject } from '@models';
import { GlobalFacade, UserFacade, UserRoleFacade } from '@store';
import { Arrow, Plus } from '@svgs';
import { keyRole, lang, renderTitleBreadcrumbs, routerLinks } from '@utils';
import classNames from 'classnames';
import { createSearchParams } from 'react-router-dom';
import _column from '@column/user';
import { DrawerForm } from '@core/drawer';

const Page = () => {
  const userRoleFacade = UserRoleFacade();
  const { user } = GlobalFacade();
  useEffect(() => {
    if (!userRoleFacade?.result?.data) userRoleFacade.get({});
    return () => {
      userFacade.set({ isLoading: true, status: EStatusState.idle });
    };
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    if (
      userRoleFacade?.result?.data?.length &&
      !userRoleFacade?.result?.data?.filter((item) => item.code === request.filter.roleCode).length
    ) {
      navigate({
        pathname: `/${lang}${routerLinks('User')}`,
        search: `?${createSearchParams({ filter: '{"roleCode":"super_admin"}' })}`,
      });
      request.filter.roleCode = 'super_admin';
      dataTableRef?.current?.onChange(request);
    }
  }, [userRoleFacade?.result]);

  const userFacade = UserFacade();
  useEffect(() => {
    renderTitleBreadcrumbs(t('titles.User'), [
      { title: t('titles.User'), link: '' },
      { title: t('titles.User/List'), link: '' },
    ]);
    switch (userFacade.status) {
      case EStatusState.postFulfilled:
      case EStatusState.putFulfilled:
      case EStatusState.deleteFulfilled:
      case EStatusState.putDisableFulfilled:
        dataTableRef?.current?.onChange(request);
        break;
    }
  }, [userFacade.status]);
  const request = JSON.parse(userFacade?.queryParams || '{}');
  if (!request.filter || typeof request?.filter === 'string') request.filter = JSON.parse(request?.filter || '{}');
  const { t } = useTranslation();
  const dataTableRef = useRef<TableRefObject>(null);
  return (
    <div className={'container mx-auto grid grid-cols-12 gap-3 px-2.5 pt-2.5'}>
      <DrawerForm
        facade={userFacade}
        columns={_column.form()}
        title={t(userFacade.data ? 'pages.User/Edit' : 'pages.User/Add', { roleCode: request.filter.roleCode })}
        onSubmit={(values) => {
          if (userFacade.data) userFacade.put({ ...values, id: userFacade.data.id, roleCode: request.filter.roleCode });
          else userFacade.post({ ...values, roleCode: request.filter.roleCode });
        }}
      />
      <div className="col-span-12 md:col-span-4 lg:col-span-3 -intro-x">
        <div className="shadow rounded-xl w-full bg-white overflow-hidden">
          <div className="h-14 flex justify-between items-center border-b border-gray-100 px-4 py-2">
            <h3 className={'font-bold text-lg'}>Role</h3>
          </div>
          <Spin spinning={userRoleFacade.isLoading}>
            <div className="h-[calc(100vh-12rem)] overflow-y-auto relative scroll hidden sm:block">
              <Tree
                blockNode
                showLine
                autoExpandParent
                defaultExpandAll
                switcherIcon={<Arrow className={'w-4 h-4'} />}
                treeData={userRoleFacade.result?.data?.map((item: any) => ({
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
                      { 'bg-gray-100': request.filter.roleCode === data.value },
                      'item text-gray-700 font-medium hover:bg-gray-100 flex justify-between items-center border-b border-gray-100 w-full text-left  group',
                    )}
                  >
                    <div
                      onClick={() => {
                        request.filter.roleCode = data.value;
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
                value={request.filter.roleCode}
                className={'w-full'}
                options={userRoleFacade?.result?.data?.map((data) => ({ label: data.name, value: data.code }))}
                onChange={(e) => {
                  request.filter.roleCode = e;
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
              className={'container mx-auto'}
              facade={userFacade}
              ref={dataTableRef}
              onRow={() => ({
                // onDoubleClick: () => userFacade.getById({ id: data.id }),
              })}
              paginationDescription={(from: number, to: number, total: number) =>
                t('routes.admin.Layout.User', { from, to, total })
              }
              columns={_column.table()}
              rightHeader={
                <div className={'flex gap-2'}>
                  {user?.role?.permissions?.includes(keyRole.P_USER_CREATE) && (
                    <Button
                      icon={<Plus className="icon-cud !h-5 !w-5" />}
                      text={t('components.button.New')}
                      onClick={() => userFacade.set({ data: undefined, isVisible: true })}
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
