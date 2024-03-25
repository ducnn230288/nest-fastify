import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import slug from 'slug';
import { Spin } from 'antd';

import { Code, CodeFacade, CodeTypeFacade, GlobalFacade, Task, TaskFacade } from '@store';
import { lang, routerLinks } from '@utils';
import { Button } from '@core/button';
import { Form } from '@core/form';
import { EStatusState, EFormRuleType, EFormType } from '@models';

const Page = () => {
  const { user, isLoading, profile, status, putProfile, set, data, formatDate } = GlobalFacade();
  const { id, type } = useParams();
  console.log(user?.id)
  const codeFacade = CodeFacade();
  const taskFacade = TaskFacade();
  
  useEffect(() => {
    if (id) taskFacade.getById({ id });
    else taskFacade.set({ data: undefined });
    set({
      breadcrumbs: [
        { title: 'titles.Task', link: '' },
        { title: 'titles.Task/Add', link: '' },
        // { title: id ? 'pages.Code/Edit' : 'pages.Code/Add', link: '' },
      ],
    });
  }, [id]);

  const navigate = useNavigate();
  const isBack = useRef(true);
  useEffect(() => {
    switch (taskFacade.status) {
      case EStatusState.postFulfilled:
      case EStatusState.putFulfilled:
        if (isBack.current) handleBack();
        else {
          isBack.current = true;
          if (id) navigate(`/${lang}${routerLinks('Task')}/add`);
          else taskFacade.set({ data: undefined });
        }
        break;
    }
  }, [taskFacade.status]);

  const handleBack = () => {
    codeFacade.set({ status: EStatusState.idle });
    navigate(`/${lang}${routerLinks('Task')}`);
  };
  const handleSubmit = (values: Task) => {
    console.log(values)
    // if (id) codeFacade.put({ ...values, id, type });
    // else codeFacade.post({ ...values, type });
    taskFacade.post({...values, assigneeIds: [user?.id]});
  };

  // const codeTypeFacade = CodeTypeFacade();
  // useEffect(() => {
  //   if (!codeTypeFacade.result?.data?.length) codeTypeFacade.get({});
  // }, []);
  // useEffect(() => {
  //   if (codeTypeFacade.result?.data?.length) {
  //     set({ titleOption: { type: codeTypeFacade.result?.data?.filter((item) => item.code === type)[0]?.name } });
  //     if (!codeTypeFacade?.result?.data?.filter((item) => item.code === type).length) {
  //       navigate({
  //         pathname: location.hash
  //           .substring(1)
  //           .replace(`/${type}/`, id && codeFacade.data?.type ? `/${codeFacade.data?.type}/` : '/position/'),
  //       });
  //     }
  //   }
  // }, [codeTypeFacade.result]);

  const { t } = useTranslation();
  return (
    <div className={'max-w-2xl mx-auto bg-white p-4 shadow rounded-xl'}>
      <Spin spinning={taskFacade.isLoading}>
        <Form
          values={{ ...taskFacade.data }}
          className="intro-x"
          columns={[
            {
              title: 'routes.admin.task.project',
              name: 'projectCode',
              formItem: {
                col: 6,
                type: EFormType.select,
                rules: [{ type: EFormRuleType.required }],
                get: {
                  facade: CodeFacade,
                  params: (fullTextSearch: string) => ({
                    fullTextSearch,
                    filter: { type: 'project' },
                    extend: {},
                  }),
                  format: (item) => ({
                    label: item.name,
                    // value: gửi đi
                    value: item.code,
                  }),
                }
              },
            },
            {
              title: 'routes.admin.task.task',
              name: 'name',
              formItem: {
                col: 6,
                type: EFormType.text,
                rules: [{ type: EFormRuleType.required }],
                // get: {
                //   facade: CodeFacade,
                //   params: (fullTextSearch: string) => ({
                //     fullTextSearch,
                //     filter: { type: 'position' },
                //     extend: {},
                //   }),
                //   format: (item) => ({
                //     label: item.name,
                //     // value: gửi đi
                //     value: item.code,
                //   }),
                // }
              },
            },
            {
              title: 'routes.admin.task.start',
              name: 'start',
              formItem: {
                col: 6,
                type: EFormType.date,
                rules: [{ type: EFormRuleType.required }],
              },
            },
            {
              title: 'routes.admin.task.deadline',
              name: 'deadline',
              formItem: {
                col: 6,
                type: EFormType.date,
                // rules: [{ type: EFormRuleType.required }],
              },
            },
            {
              title: 'routes.admin.task.priority',
              name: 'priority',
              formItem: {
                col: 6,
                type: EFormType.select,
                rules: [{ type: EFormRuleType.required }],
                list: [
                  {label: 'Normal', value: -1},
                  {label: 'Hard', value: 0},
                  {label: 'Urgent', value: 1},
                ]
              },
            },
            {
              title: 'routes.admin.task.status',
              name: 'status',
              formItem: {
                col: 6,
                type: EFormType.select,
                rules: [{ type: EFormRuleType.required }],
                list: [
                  {label: 'Complete', value: 1},
                  {label: 'Processing', value: 0},
                ]
              },
            },
            {
              title: 'routes.admin.task.level',
              name: 'level',
              formItem: {
                col: 6,
                type: EFormType.number,
                rules: [{ type: EFormRuleType.required }],
              },
            },
            {
              title: 'routes.admin.task.order',
              name: 'order',
              formItem: {
                col: 6,
                type: EFormType.number,
                rules: [{ type: EFormRuleType.required }],
              },
            },
            {
              title: 'routes.admin.task.complete',
              name: 'complete',
              formItem: {
                col: 6,
                type: EFormType.number,
                rules: [{ type: EFormRuleType.required }, { type: EFormRuleType.min, value: 0 }, { type: EFormRuleType.max, value: 100 }],
              },
            },
            {
              title: 'routes.admin.task.predecessors',
              name: 'predecessors',
              formItem: {
                col: 6,
                type: EFormType.text,
                rules: [{ type: EFormRuleType.required }]
              },
            },
            {
              title: 'routes.admin.task.successors',
              name: 'successors',
              formItem: {
                col: 6,
                type: EFormType.text,
                rules: [{ type: EFormRuleType.required }]
              },
            },
          ]}
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
          disableSubmit={taskFacade.isLoading}
          handCancel={handleBack}
        />
      </Spin>
    </div>
  );
};
export default Page;
