import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { DataTable } from '@core/data-table';
import { Booking, GlobalFacade, TaskFacade, TimeSheetFacade, UserFacade } from '@store';

import dayjs from 'dayjs';
import { Button } from '@core/button';
import { Check, Edit, Plus, Trash } from '@svgs';
import { ModalForm } from '@core/modal/form';
import { keyRole, lang, routerLinks } from '@utils';
import { EFormRuleType, EFormType, EStatusState, ETableAlign } from '@models';
import { ToolTip } from '@core/tooltip';
import { PopConfirm } from '@core/pop-confirm';
const Page = () => {
  const { set } = GlobalFacade();
  const { t } = useTranslation();
  const timeSheetFacade = TimeSheetFacade();
  const dataTableRef = useRef<any>();
  const modalFormRefcheckin = useRef<any>();
  const modalFormRefcheckout = useRef<any>();
  const navigate = useNavigate();
  // const { id, date } = useParams();
  // const { data } = timeSheetFacade;
  // console.log(data)


  useEffect(() => {
    set({
      breadcrumbs: [
        { title: 'titles.TimeSheet', link: '' },
        { title: 'titles.TimeSheet/List', link: '' },
        // { title: id ? 'pages.Code/Edit' : 'pages.Code/Add', link: '' },
      ],
    });
  }, []);

  return (
    <>
      <div className="justify-end flex content-end">
        <Button
          icon={<Plus className="w-3 h-3 mr-2 " />}
          text={t('Check in')}
          className={' sm:min-w-[8rem] justify-center out-line  sm:w-auto mr-5'}
          onClick={() => modalFormRefcheckin?.current?.handleEdit()}
        />
        <ModalForm
          textSubmit='Check in'
          keyPost='post'
          keyState="1"
          facade={timeSheetFacade}
          ref={modalFormRefcheckin}
          title={() => t('Check in')}
          className="z form"
          columns={[
            {
              title: 'listTask',
              name: 'listTask',
              formItem: {
                type: EFormType.addable,
                rules: [{ type: EFormRuleType.required }],
                col: 12,
                column: [
                  {
                    title: 'taskId',
                    name: 'id',
                    formItem: {
                      rules: [{ type: EFormRuleType.required }],
                      type: EFormType.select,
                      get: {
                        facade: TaskFacade,
                        format: (item) => ({
                          label: item.name,
                          value: item.id,
                        }),
                      }

                    }
                  },
                ],
              },
            },
          ]}
        />
        {/* <Button
          icon={<Plus className="w-3 h-3 mr-2 " />}
          text={t('Check out')}
          className={' sm:min-w-[8rem] justify-center out-line  sm:w-auto'}
          onClick={() => modalFormRefcheckout?.current?.handleEdit()}
          // onClick={}
        /> */}
        <ModalForm  
          textSubmit='Check out' 
          keyPost='putCheckin'
          facade={timeSheetFacade}
          ref={modalFormRefcheckout}
          title={() => t('Check out')}
          className="z form"
          columns={[
            {
              title:'note',
              name: 'note',
              formItem: {
                rules: [{ type: EFormRuleType.required }],
                col: 12,
                type: EFormType.text,
              }
            },
            {
              title: 'listTaskWork',
              name: 'works',
              formItem: {
                type: EFormType.addable,
                rules: [{ type: EFormRuleType.required }],
                col: 12,
                column: [
                  {
                    title: 'workId',
                    name: 'id',
                    formItem: {
                      type: EFormType.select,
                      disabled: () => true,
                      list: timeSheetFacade?.data?.works?.map((i) => ({value: i.id, label: i.task?.name})) ?? []
                    }
                  },
                  
                  {
                    title: 'hours',
                    name: 'hours',
                    formItem: {
                      rules: [{ type: EFormRuleType.required }],
                      // EFormType.number: đang ở dạng string khi submit
                      type: EFormType.number,
                    }
                  },
                  // {
                  //   title: 'taskId',
                  //   name: 'taskId',
                  //   formItem: {
                  //     type: EFormType.select,
                  //   }
                  // },
                ],
              },
            },
          ]}
        />
      </div>

      <DataTable
        className={'max-w-5xl mx-auto'}
        facade={timeSheetFacade}
        ref={dataTableRef}
        pageSizeRender={(sizePage: number) => sizePage}
        pageSizeWidth={'50px'}
        onRow={(data: any) => ({
          onDoubleClick: () => {
            navigate(`/${lang}${routerLinks('Task')}/${data?.works?.[0]?.task?.id}`);
          },
        })}
        paginationDescription={(from: number, to: number, total: number) =>
          t('routes.admin.team.Pagination', { from, to, total })
        }
        columns={[
          {
            title: 'Ngày',
            name: 'start',

            tableItem: {
              width: 100,
              render: (text, item) => (
                <div className="flex">
                  <div>{dayjs(item?.updatedAt).format('MM-DD')}</div>
                  <div>{dayjs(item?.start, 'YYYY-MM-DD').format('ddd')}</div>
                </div>
              ),
            },
          },
          {
            title: 'Tên người dùng',
            name: 'user',
            tableItem: {
              render: (text, item) => <div className="text-blue-600 font-semibold">{item?.user?.name}</div>,
            },
          },
          {
            title: 'Todo',
            name: '',
            tableItem: {
              render: (text, item) => (
                // console.log('text',text),
                // console.log('item',item),
                // item.works.forEach((ok:any) => {
                //   return ok?.task?.project?.name
                // })
                <div className="flex">
                      <div className="font-semibold pr-1">{item?.works[0]?.task?.project?.name
                      }:</div>
                      <div> {item?.works[0]?.task?.name}</div>
                    </div>
              ),
              // renderOK: (item) => {
              //   console.log('item',item)
              // }
            },
          },
          {
            title: 'Thời gian',
            name: 'createdAt',
            tableItem: {
              render: (text, item) => (
                <div className="flex">
                  <div className="">{dayjs(item?.start).format('HH:mm')}</div>
                  {/* <div>{dayjs(item?.finish).format('HH:mm')}</div> */}
                </div>
              ),
            },
          },
          {
            title: 'Bản tính',
            name: 'id',
            tableItem: {
              render: (text, item) => item?.user?.name,
            },
          },
          {
            title: 'Thao tác',
            name: '',
            tableItem: {
              width: 100,
              align: ETableAlign.center,
              render: (text: string, data) => (
                // console.log('data',data),
                <div className={'flex gap-2'}>
                  {/* {user?.role?.permissions?.includes(keyRole.P_TASKTIMESHEET_UPDATE) && ( */}
                    <ToolTip title={t('routes.admin.TimeSheet.checkout')}>
                      <button
                        title={t('routes.admin.TimeSheet.checkout') || ''}
                        onClick={() => {modalFormRefcheckout?.current?.handleEdit({id: data.id}); console.log(data.id)}}
                      >
                        <Check className="icon-cud bg-green-600 hover:bg-green-400" />
                      </button>
                    </ToolTip>
                  {/* )} */}
                  {/* {user?.role?.permissions?.includes(keyRole.P_TASKTIMESHEET_DELETE) && ( */}
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
                  {/* )} */}
                </div>
              ),
            },
          },
        ]}
      />
    </>
  );
};
export default Page;
