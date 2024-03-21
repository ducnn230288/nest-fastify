import { DataTableModel, EFormRuleType, EFormType, ETableAlign, ETableFilterType, FormModel } from '@models';
import { Avatar } from '@core/avatar';
import dayjs from 'dayjs';
import { Check, Disable, Edit, Trash } from '@svgs';
import React from 'react';
import { GlobalFacade, PostFacade } from '@store';
import { useTranslation } from 'react-i18next';
import slug from 'slug';
import { keyRole } from '@utils';
import { ToolTip } from '@core/tooltip';
import { PopConfirm } from '@core/pop-confirm';

export default {
  table: (): DataTableModel[] => {
    const { formatDate, user } = GlobalFacade();
    const { t } = useTranslation();
    const postFacade = PostFacade();

    return [
      {
        title: 'routes.admin.Post.Name',
        name: 'translations.name',
        tableItem: {
          filter: { type: ETableFilterType.search },
          sorter: true,
          render: (_: string, item: any) => (
            <Avatar
              src={item.thumbnailUrl}
              text={
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
        title: 'Slug',
        name: 'translations.slug',
        tableItem: {
          filter: { type: ETableFilterType.search },
          sorter: true,
          render: (_: string, item: any) =>
            item.translations.length
              ? item.translations?.filter((item: any) => item?.language === localStorage.getItem('i18nextLng'))[0].slug
              : '',
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
              {user?.role?.permissions?.includes(keyRole.P_POST_UPDATE) && (
                <ToolTip title={t(data.isDisabled ? 'components.datatable.Disabled' : 'components.datatable.Enabled')}>
                  <PopConfirm
                    title={t(
                      !data.isDisabled
                        ? 'components.datatable.areYouSureWantDisable'
                        : 'components.datatable.areYouSureWantEnable',
                    )}
                    onConfirm={() => postFacade.putDisable({ id: data.id, disable: !data.isDisabled })}
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
              {user?.role?.permissions?.includes(keyRole.P_POST_UPDATE) && (
                <ToolTip title={t('routes.admin.Layout.Edit')}>
                  <button
                    title={t('routes.admin.Layout.Edit') || ''}
                    onClick={() => postFacade.getById({ id: data.id })}
                  >
                    <Edit className="icon-cud bg-teal-900 hover:bg-teal-700" />
                  </button>
                </ToolTip>
              )}
              {user?.role?.permissions?.includes(keyRole.P_POST_DELETE) && (
                <ToolTip title={t('routes.admin.Layout.Delete')}>
                  <PopConfirm
                    title={t('components.datatable.areYouSureWant')}
                    onConfirm={() => postFacade.delete(data.id)}
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
  form: (id?: string): FormModel[] => {
    return [
      {
        title: 'Created At',
        name: 'createdAt',
        formItem: {
          col: 6,
          type: EFormType.date,
          rules: id ? [{ type: EFormRuleType.required }] : [],
        },
      },
      {
        title: 'Thumbnail Url',
        name: 'thumbnailUrl',
        formItem: {
          col: 6,
          type: EFormType.upload,
        },
      },
      {
        name: 'translations',
        title: '',
        formItem: {
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
                col: 6,
                rules: [{ type: EFormRuleType.required }],
                onBlur: (value, form, name) => {
                  if (value && !form.getFieldValue(['translations', name[0], 'slug'])) {
                    form.setFieldValue(['translations', name[0], 'slug'], slug(value));
                  }
                },
              },
            },
            {
              title: 'Slug',
              name: 'slug',
              formItem: {
                col: 6,
                rules: [{ type: EFormRuleType.required }, { type: EFormRuleType.max, value: 100 }],
              },
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
              formItem: {
                type: EFormType.editor,
              },
            },
          ],
        },
      },
    ];
  },
};
