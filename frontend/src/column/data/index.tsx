import { DataTableModel, EFormRuleType, EFormType, ETableAlign, ETableFilterType, FormModel } from '@models';
import dayjs from 'dayjs';
import { ToolTip } from '@core/tooltip';
import { PopConfirm } from '@core/pop-confirm';
import { Check, Disable, Edit, Trash } from '@svgs';
import React from 'react';
import { DataFacade, GlobalFacade } from '@store';
import { useTranslation } from 'react-i18next';
import { keyRole } from '@utils';
import { Avatar } from '@core/avatar';

export default {
  table: (): DataTableModel[] => {
    const { formatDate, user } = GlobalFacade();
    const { t } = useTranslation();
    const dataFacade = DataFacade();

    return [
      {
        title: 'routes.admin.Data.Name',
        name: 'name',
        tableItem: {
          filter: { type: ETableFilterType.search },
          sorter: true,
          render: (text: string, item: any) => (
            <Avatar
              src={item.image}
              text={
                text ||
                (item.translations.length &&
                  item.translations?.filter((item: any) => item?.language === localStorage.getItem('i18nextLng'))[0]
                    .name) ||
                ''
              }
            />
          ),
        },
      },
      {
        title: 'routes.admin.Data.Order',
        name: 'order',
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
              {user?.role?.permissions?.includes(keyRole.P_DATA_UPDATE) && (
                <ToolTip title={t(data.isDisabled ? 'components.datatable.Disabled' : 'components.datatable.Enabled')}>
                  <PopConfirm
                    title={t(
                      !data.isDisabled
                        ? 'components.datatable.areYouSureWantDisable'
                        : 'components.datatable.areYouSureWantEnable',
                    )}
                    onConfirm={() => dataFacade.putDisable({ id: data.id, disable: !data.isDisabled })}
                  >
                    <button
                      title={
                        t(data.isDisabled ? 'components.datatable.Disabled' : 'components.datatable.Enabled') || ''
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
              {user?.role?.permissions?.includes(keyRole.P_DATA_UPDATE) && (
                <ToolTip title={t('routes.admin.Layout.Edit')}>
                  <button
                    title={t('routes.admin.Layout.Edit') || ''}
                    onClick={() => dataFacade.getById({ id: data.id })}
                  >
                    <Edit className="icon-cud bg-teal-900 hover:bg-teal-700" />
                  </button>
                </ToolTip>
              )}
              {user?.role?.permissions?.includes(keyRole.P_DATA_DELETE) && (
                <ToolTip title={t('routes.admin.Layout.Delete')}>
                  <PopConfirm
                    title={t('components.datatable.areYouSureWant')}
                    onConfirm={() => dataFacade.delete(data.id)}
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
    ];
  },
  form: (type?: string): FormModel[] => {
    return [
      {
        title: 'Name',
        name: 'name',
        formItem: type === 'partner' || type === 'tech' ? {} : undefined,
      },
      {
        title: 'routes.admin.Data.Order',
        name: 'order',
        formItem: {
          col: type === 'partner' || type === 'tech' ? 12 : 6,
          type: EFormType.number,
        },
      },
      {
        title: 'routes.admin.Data.Image',
        name: 'image',
        formItem: {
          col: type === 'partner' || type === 'tech' ? 12 : 6,
          type: EFormType.upload,
        },
      },
      {
        name: 'translations',
        title: '',
        formItem:
          type === 'partner' || type === 'tech'
            ? undefined
            : {
                type: EFormType.tab,
                tab: 'language',
                list: [
                  { label: 'English', value: 'en' },
                  { label: 'Vietnam', value: 'vn' },
                ],
                column: [
                  { title: 'id', name: 'id', formItem: { type: EFormType.hidden } },
                  {
                    title: 'Name',
                    name: 'name',
                    formItem: {
                      col: type === 'member' ? 6 : 12,
                      rules: [{ type: EFormRuleType.required }],
                    },
                  },

                  {
                    title: 'Position',
                    name: 'position',
                    formItem:
                      type === 'member'
                        ? {
                            col: 6,
                          }
                        : undefined,
                  },

                  {
                    title: 'Description',
                    name: 'description',
                    formItem: {
                      type: EFormType.textarea,
                    },
                  },

                  {
                    title: 'Content',
                    name: 'content',
                    formItem:
                      type === 'member'
                        ? {
                            type: EFormType.editor,
                          }
                        : undefined,
                  },
                ],
              },
      },
    ];
  },
};
