import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { Spin } from 'antd';

import { Post, PostFacade, PostTypeFacade } from '@store';
import { lang, renderTitleBreadcrumbs, routerLinks } from '@utils';
import { Button } from '@core/button';
import { Form } from '@core/form';
import { EStatusState } from '@models';
import _column from '@column/post';

const Page = () => {
  const { id, type } = useParams();
  const postFacade = PostFacade();
  const param = JSON.parse(postFacade.queryParams || `{"filter":"{\\"type\\":\\"${type}\\"}"}`);
  useEffect(() => {
    if (id) postFacade.getById({ id });
    else postFacade.set({ data: undefined, isLoading: false });
  }, [id]);

  const navigate = useNavigate();
  const isBack = useRef(true);
  useEffect(() => {
    renderTitleBreadcrumbs(t(id ? 'pages.Post/Edit' : 'pages.Post/Add'), [
      { title: t('titles.Setting'), link: '' },
      { title: t('titles.Post'), link: '' },
      { title: t(id ? 'pages.Post/Edit' : 'pages.Post/Add'), link: '' },
    ]);
    switch (postFacade.status) {
      case EStatusState.postFulfilled:
      case EStatusState.putFulfilled:
        if (isBack.current) handleBack();
        else {
          isBack.current = true;
          if (id) navigate(`/${lang}${routerLinks('Post')}/${type}/add`);
          else postFacade.set({ data: {} });
        }
        break;
    }
  }, [postFacade.status]);

  const handleBack = () => {
    postFacade.set({ status: EStatusState.idle });
    navigate(
      `/${lang}${routerLinks('Post')}?${new URLSearchParams({ ...param, filter: JSON.stringify({ ...JSON.parse(param?.filter || '{}'), type }) }).toString()}`,
    );
  };

  const handleSubmit = (values: Post) => {
    if (id) postFacade.put({ ...values, id, type });
    else postFacade.post({ ...values, type });
  };

  const postTypeFacade = PostTypeFacade();
  useEffect(() => {
    if (!postTypeFacade.result?.data?.length) postTypeFacade.get({});
  }, []);
  useEffect(() => {
    if (postTypeFacade.result?.data?.length) {
      if (!postTypeFacade?.result?.data?.filter((item) => item.code === type).length) {
        navigate({
          pathname: location.hash
            .substring(1)
            .replace(`/${type}/`, id && postFacade.data?.type ? `/${postFacade.data?.type}/` : '/projects/'),
        });
      }
    }
  }, [postTypeFacade.result]);
  const { t } = useTranslation();
  return (
    <div className={'max-w-3xl mx-auto bg-white p-4 shadow rounded-xl relative'}>
      <Spin spinning={postFacade.isLoading}>
        <Form
          values={{ ...postFacade.data }}
          className="intro-x"
          columns={_column.form(id)}
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
          disableSubmit={postFacade.isLoading}
          handCancel={handleBack}
        />
      </Spin>
    </div>
  );
};
export default Page;
