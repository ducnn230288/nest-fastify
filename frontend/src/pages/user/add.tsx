import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { Spin } from 'antd';

import { User, UserFacade, UserRoleFacade } from '@store';
import { lang, renderTitleBreadcrumbs, routerLinks } from '@utils';
import { Button } from '@core/button';
import { Form } from '@core/form';
import { EStatusState } from '@models';
import _column from '@column/user';

const Page = () => {
  const { id, roleCode } = useParams();
  const userFacade = UserFacade();
  const param = JSON.parse(userFacade.queryParams || `{"filter":"{\\"roleCode\\":\\"${roleCode}\\"}"}`);
  useEffect(() => {
    if (id) userFacade.getById({ id });
    else userFacade.set({ data: undefined });
  }, [id]);

  const navigate = useNavigate();
  const isBack = useRef(true);
  useEffect(() => {
    renderTitleBreadcrumbs(
      t( id ? 'pages.User/Edit' : 'pages.User/Add'),
      [
        { title: t('titles.User'), link: '' },
        { title:  t( id ? 'pages.User/Edit' : 'pages.User/Add'), link: '' },
      ]
    );
    switch (userFacade.status) {
      case EStatusState.postFulfilled:
      case EStatusState.putFulfilled:
        if (isBack.current) handleBack();
        else {
          isBack.current = true;
          if (id) navigate(`/${lang}${routerLinks('User')}/${roleCode}/add`);
          else userFacade.set({ data: {} });
        }
        break;
    }
  }, [userFacade.status]);

  const handleBack = () => {
    userFacade.set({ status: EStatusState.idle });
    navigate(`/${lang}${routerLinks('User')}?${new URLSearchParams({...param, filter: JSON.stringify({...JSON.parse(param?.filter || '{}'), roleCode })}).toString()}`);

  };
  const handleSubmit = (values: User) => {
    if (id) userFacade.put({ ...values, id, roleCode });
    else userFacade.post({ ...values, roleCode });
  };
  const userRoleFacade = UserRoleFacade();
  useEffect(() => {
    if (!userRoleFacade.result?.data?.length) userRoleFacade.get({});
  }, []);
  useEffect(() => {
    if (userRoleFacade.result?.data?.length) {
      if (!userRoleFacade?.result?.data?.filter((item) => item.code === roleCode).length) {
        navigate({
          pathname: location.hash
            .substring(1)
            .replace(`/${roleCode}/`, id && userFacade.data?.roleCode ? `/${userFacade.data?.roleCode}/` : '/staff/'),
        });
      }
    }
  }, [userRoleFacade.result]);
  const { t } = useTranslation();
  return (
    <div className={'max-w-4xl mx-auto bg-white p-4 shadow rounded-xl'}>
      <Spin spinning={userFacade.isLoading}>
        <Form
          values={{ ...userFacade.data }}
          className="intro-x"
          columns={_column.form()}
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
          disableSubmit={userFacade.isLoading}
          handCancel={handleBack}
        />
      </Spin>
    </div>
  );
};
export default Page;
