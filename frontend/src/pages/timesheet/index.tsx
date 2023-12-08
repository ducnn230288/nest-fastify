import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Popconfirm, Tooltip } from 'antd';
import { useNavigate } from 'react-router';
import { DataTable } from '@core/data-table';
import { GlobalFacade, TimeSheetFacade, UserTeamFacade } from '@store';

import dayjs, { Dayjs } from 'dayjs';
import { Button } from '@core/button';
import { Plus } from '@svgs';
import { ModalForm } from '@core/modal/form';
import { lang, routerLinks } from '@utils';
const Page = () => {
    const { formatDate } = GlobalFacade();
    const { t } = useTranslation();
    const timeSheetFacade = TimeSheetFacade();
    const dataTableRef = useRef<any>();
    const modalFormRefcheckin = useRef<any>();
    const navigate = useNavigate();
    return (
        <>
            <div className='justify-end flex content-end'>
                <Button
                    icon={<Plus className='w-3 h-3 mr-2 ' />}
                    text={t('Check in')}
                    className={' sm:min-w-[8rem] justify-center out-line  sm:w-auto mr-5'}

                    onClick={() => modalFormRefcheckin?.current?.handleEdit()}
                />
                <ModalForm
                    keyState=''
                    facade={timeSheetFacade}
                    ref={modalFormRefcheckin}
                    title={(data: any) => t('Xem giá')}
                    className='z form'
                    columns={[
                        {
                            title: '',
                            name: 'works',
                            formItem: {
                                render: (text, item) => {
                                    return (
                                        <>
                                            <div className="sm:pt-2 border-t">
                                                <div className="flex items-center h-full w-full text-base lg:mt-0 mt-4 form-store mb-5">
                                                    <div className="w-1/2 flex">
                                                        <div className="font-semibold text-teal-900 ">Tên sản phẩm:</div>
                                                        <div className="ml-4">{item?.works?.[0]?.task?.project?.name }</div>
                                                    </div>
                                                    <div className="w-1/2 flex">
                                                        <div className="font-semibold text-teal-900 ">Nhà cung cấp:</div>
                                                        <div className="ml-4">
                                                            {item?.subOrg?.name}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center h-full text-base lg:mt-0 mt-4 form-store mb-5">
                                                    <div className="font-semibold text-teal-900 ">Đơn vị cơ bản:</div>
                                                    <div className="ml-4">{item?.basicUnit}</div>
                                                </div>
                                            </div>
                                        </>
                                    );
                                },
                            }
                        },

                    ]}
                    widthModal={1000}
                    footerCustom={(handleOk, handleCancel) => (
                        <div className=" w-full bg-white ">
                            <div className="flex flex-col items-start mb-[33px] ml-[9px]">
                                <button
                                    className="z-10 px-8 sm:w-auto w-3/5 bg-white border-teal-900 hover:border-teal-600 border-solid border p-2 rounded-xl text-teal-900 hover:text-teal-600 sm:mt-1 mt-2 text-sm h-11"
                                    onClick={handleCancel}
                                >
                                    {t('components.form.modal.cancel')}
                                </button>
                            </div>
                        </div>
                    )}
                />
                <Button
                    icon={<Plus className='w-3 h-3 mr-2 ' />}
                    text={t('Check out')}
                    className={' sm:min-w-[8rem] justify-center out-line  sm:w-auto'}

                // onClick={}
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
                        navigate(`/${lang}${routerLinks('TimeSheet')}/${data?.works?.[0]?.task?.id}/checkin`)
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
                            render: (text, item) => <div className='flex'>
                                <div>{dayjs(item?.updatedAt).format("MM-DD")}</div>
                                <div>{dayjs(item?.start, 'YYYY-MM-DD').format('ddd')}</div>
                            </div>,

                        },
                    },
                    {
                        title: 'Tên người dùng',
                        name: 'user',
                        tableItem: {
                            render: (text, item) => <div className='text-blue-600 font-semibold'>{item?.user?.name}</div>,
                        },
                    },
                    {
                        title: 'Todo',
                        name: '',
                        tableItem: {
                            render: (text, item) => <div className='flex'><div className='font-semibold pr-1'>{item?.works?.[0]?.task?.project?.name}:</div>
                                <div> {item?.works?.[0]?.task?.name}</div>
                            </div>,
                        },
                    },
                    {
                        title: 'Thời gian',
                        name: 'name',
                        tableItem: {
                            render: (text, item) => <div className='flex'><div className=''>{dayjs(item?.start).format('HH:mm')}:</div>
                                <div>{dayjs(item?.finish).format('HH:mm')}</div>
                            </div>,
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
                        name: 'id',
                        tableItem: {
                            render: (text, item) => item?.user?.name,

                        },
                    },
                ]}
            />
        </>
    );
};
export default Page;
