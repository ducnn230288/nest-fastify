import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { Spin } from 'antd';

import { Data, DataFacade, DataTypeFacade } from '@store';
import { lang, renderTitleBreadcrumbs, routerLinks } from '@utils';
import { Button } from '@core/button';
import { Form } from '@core/form';
import { EStatusState } from '@models';
import _column from '@column/data';

const Page = () => {
  const { id, type } = useParams();
  const dataFacade = DataFacade();
  const param = JSON.parse(dataFacade.queryParams || `{"filter":"{\\"type\\":\\"${type}\\"}"}`);
  useEffect(() => {
    if (id) dataFacade.getById({ id });
    else dataFacade.set({ data: undefined, isLoading: false });
  }, [id]);

  const navigate = useNavigate();
  const isBack = useRef(true);
  useEffect(() => {
    renderTitleBreadcrumbs(t(id ? 'pages.Data/Edit' : 'pages.Data/Add'), [
      { title: t('titles.Setting'), link: '' },
      { title: t('titles.Data'), link: '' },
      { title: t(id ? 'pages.Data/Edit' : 'pages.Data/Add'), link: '' },
    ]);
    switch (dataFacade.status) {
      case EStatusState.postFulfilled:
      case EStatusState.putFulfilled:
        if (isBack.current) handleBack();
        else {
          isBack.current = true;
          if (id) navigate(`/${lang}${routerLinks('Data')}/${type}/add`);
          else dataFacade.set({ data: {} });
        }
        break;
    }
  }, [dataFacade.status]);

  const handleBack = () => {
    dataFacade.set({ status: EStatusState.idle });
    navigate(
      `/${lang}${routerLinks('Data')}?${new URLSearchParams({ ...param, filter: JSON.stringify({ ...JSON.parse(param?.filter || '{}'), type }) }).toString()}`,
    );
  };

  const handleSubmit = (values: Data) => {
    if (id) dataFacade.put({ ...values, id, type });
    else dataFacade.post({ ...values, type });
  };

  const dataTypeFacade = DataTypeFacade();
  useEffect(() => {
    if (!dataTypeFacade.result?.data?.length) dataTypeFacade.get({});
  }, []);
  useEffect(() => {
    if (dataTypeFacade.result?.data?.length) {
      if (!dataTypeFacade?.result?.data?.filter((item) => item.code === type).length) {
        navigate({
          pathname: location.hash
            .substring(1)
            .replace(`/${type}/`, id && dataFacade.data?.type ? `/${dataFacade.data?.type}/` : '/partner/'),
        });
      }
    }
  }, [dataTypeFacade.result]);
  const { t } = useTranslation();
  return (
    <div className={'max-w-3xl mx-auto bg-white p-4 shadow rounded-xl'}>
      <Spin spinning={dataFacade.isLoading}>
        <Form
          values={{ ...dataFacade.data }}
          className="intro-x"
          columns={_column.form(type)}
          extendButton={(form) => (
            <Button
              text={t('components.button.Save and Add new')}
              className={'md:min-w-48 justify-center out-line'}
              onClick={() => {
                form.submit();
                isBack.current = false;
              }}
            />
          )}
          handSubmit={handleSubmit}
          disableSubmit={dataFacade.isLoading}
          handCancel={handleBack}
        />
      </Spin>
    </div>
  );
};
export default Page;
