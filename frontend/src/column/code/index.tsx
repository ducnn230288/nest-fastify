import { DataTableModel, EFormRuleType, EFormType, ETableAlign, ETableFilterType, FormModel } from '@models';
import dayjs from 'dayjs';
import { ToolTip } from '@core/tooltip';
import { PopConfirm } from '@core/pop-confirm';
import { Check, Disable, Edit, Trash } from '@svgs';
import React from 'react';
import { CodeFacade, GlobalFacade } from '@store';
import { useTranslation } from 'react-i18next';
import slug from 'slug';
import { keyRole } from '@utils';

export default {
  table: (): DataTableModel[] => {
    const { formatDate, user } = GlobalFacade();
    const { t } = useTranslation();
    const codeFacade = CodeFacade();

    return [
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
                <ToolTip title={t(data.isDisabled ? 'components.datatable.Disabled' : 'components.datatable.Enabled')}>
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
                    onConfirm={() => codeFacade.delete(data.id)}
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
  form: (): FormModel[] => {
    return [
      {
        title: 'routes.admin.Code.Name',
        name: 'name',
        formItem: {
          col: 6,
          rules: [{ type: EFormRuleType.required }],
          onBlur: (value, form) => {
            if (value && !form.getFieldValue('code')) {
              form.setFieldValue('code', slug(value).toUpperCase());
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
    ];
  },
};
