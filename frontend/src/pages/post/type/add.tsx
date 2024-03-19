import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { Spin } from 'antd';

import { PostType, PostTypeFacade } from '@store';
import { lang, renderTitleBreadcrumbs, routerLinks } from '@utils';
import { Button } from '@core/button';
import { Form } from '@core/form';
import { EStatusState } from '@models';
import _column from '@column/post/type';

const Page = () => {
  const { id } = useParams();
  const postTypeFacade = PostTypeFacade();
  const isReload = useRef(false);
  const param = JSON.parse(postTypeFacade.queryParams || '{}');
  useEffect(() => {
    if (!postTypeFacade.tree) postTypeFacade.getTree();
    if (id) postTypeFacade.getById({ id });
    else postTypeFacade.set({ data: undefined });
    return () => {
      isReload.current && postTypeFacade.getTree();
    };
  }, [id]);

  const navigate = useNavigate();
  const isBack = useRef(true);
  useEffect(() => {
    renderTitleBreadcrumbs(
      t(id ? 'pages.Post/Edit' :  'pages.Post/Add'),
      [
        { title: t('titles.Setting'), link: '', },
        { title: t('titles.Post'), link: '' },
        { title:  t(id ? 'pages.Post/Edit' :  'pages.Post/Add'), link: '' }]
    );
    switch (postTypeFacade.status) {
      case EStatusState.postFulfilled:
      case EStatusState.putFulfilled:
        postTypeFacade.getTree();
        if (Object.keys(param).length > 0) isReload.current = true;

        if (isBack.current) handleBack();
        else {
          isBack.current = true;
          navigate(`/${lang}${routerLinks('Post')}/add`);
        }
        break;
    }
  }, [postTypeFacade.status]);

  const handleBack = () => navigate(`/${lang}${routerLinks('Post')}?${new URLSearchParams(param).toString()}`);

  const handleSubmit = (values: PostType) => {
    if (id) postTypeFacade.put({ ...values, id });
    else postTypeFacade.post(values);
  };

  const { t } = useTranslation();
  return (
    <div className={'max-w-3xl mx-auto bg-white p-4 shadow rounded-xl'}>
      <Spin spinning={postTypeFacade.isLoading}>
        <Form
          values={{ ...postTypeFacade.data }}
          className="intro-x"
          columns={_column.form(id, postTypeFacade.tree)}
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
          disableSubmit={postTypeFacade.isLoading}
          handCancel={handleBack}
        />
      </Spin>
    </div>
  );
};
export default Page;
