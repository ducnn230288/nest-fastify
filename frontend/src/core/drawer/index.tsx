import React, { forwardRef, Ref, useImperativeHandle } from 'react';
import { Drawer, Form as FormAnt } from 'antd';

import { FormModel, FormModalRefObject } from '@models';
import { Form } from '../form';
import classNames from 'classnames';
import { Button } from '@core/button';
import { useTranslation } from 'react-i18next';
import { convertFormValue } from '@utils';

export const DrawerForm = forwardRef(
  (
    {
      size,
      title,
      columns,
      textSubmit = 'components.form.modal.save',
      textCancel = 'components.datatable.cancel',
      facade,
      keyState = 'isVisible',
      keyIsLoading = 'isLoading',
      keyData = 'data',
      onSubmit,
    }: Type,
    ref: Ref<FormModalRefObject>,
  ) => {
    useImperativeHandle(ref, () => ({ form }));
    const { t } = useTranslation();
    const [form] = FormAnt.useForm();

    return (
      <Drawer
        size={size}
        footer={
          <div className={classNames('gap-3 flex mt-2 items-center sm:flex-row justify-end')}>
            <Button
              text={t(textCancel)}
              className={'sm:min-w-36 justify-center out-line !border-black w-full sm:w-auto'}
              onClick={() => facade.set({ [keyData]: undefined, [keyState]: false })}
            />
            <Button
              text={t(textSubmit)}
              onClick={async () => onSubmit(convertFormValue(columns, await form.validateFields()))}
              disabled={facade[keyIsLoading]}
              className={'sm:min-w-48 justify-center w-full sm:w-auto'}
            />
          </div>
        }
        title={title}
        open={facade[keyState]}
        onClose={() => facade.set({ [keyData]: undefined, [keyState]: false })}
        closeIcon={null}
      >
        <Form
          className="intro-x"
          values={{ ...facade[keyData] }}
          formAnt={form}
          columns={columns}
          spinning={facade[keyIsLoading]}
        />
      </Drawer>
    );
  },
);
DrawerForm.displayName = 'DrawerForm';
type Type = {
  facade: any;
  size?: undefined | 'large';
  keyState?: string;
  keyIsLoading?: string;
  keyData?: string;
  title: string;
  columns: FormModel[];
  textSubmit?: string;
  textCancel?: string;
  onSubmit: (value: any) => void;
};
