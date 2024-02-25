import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { Spin } from 'antd';
import dayjs from 'dayjs';

import { Booking, TimeSheetFacade, TaskFacade } from '@store';
import { routerLinks, lang } from '@utils';
import { Button } from '@core/button';
import { Form } from '@core/form';
import { EFormRuleType, EFormType } from '@models';
const Page = () => {
  const { id, date } = useParams();
  const timesheetFacade = TimeSheetFacade();
  const taskFacade = TaskFacade();

  useEffect(() => {
    if (id) {
      taskFacade.getById({ id });

      // console.log(data?.works?.[0]?.task?.project?.name )
      // const transformed = data?.works?.map((work: { task: { project: { name: any; }; }; }) => ({
      //   name: work?.task?.project?.name,
      //   label: work?.task?.project?.name,
      // })) || [];
      // setProjectName(transformed);
      // const transformedtask =data?.works?.map((work: { task: { name: any; }; }) => ({
      //   value: work?.task?.name,
      //   label: work?.task?.name,
      // })) || [];
      // setTaskName(transformedtask);
    }
  }, [id]);
  console.log(taskFacade);
  const navigate = useNavigate();
  const isBack = useRef(true);

  const handleBack = () => navigate(`/${lang}${routerLinks('TimeSheet')}`);
  const handleSubmit = (values: Booking) => {
    values.startTime = dayjs(values.time![0].format('HH:mm') + ' ' + date).toISOString();
    values.endTime = dayjs(values.time![1].format('HH:mm') + ' ' + date).toISOString();
    delete values.time;
    // if (id) timesheetFacade.put({ ...values, typeCode, id });
    // else timesheetFacade.post({ ...values, typeCode });
  };

  const { t } = useTranslation();
  return (
    <div className={'max-w-3xl mx-auto bg-white p-4 shadow rounded-xl'}>
      <Spin spinning={taskFacade.isLoading}>
        <Form
          values={{ ...taskFacade.data }}
          className="intro-x"
          columns={[
            {
              title: 'Project',
              name: 'Project',
              formItem: {
                type: EFormType.addable,
                rules: [{ type: EFormRuleType.required }],
                col: 6,
                column: [
                  {
                    title: 'managerId',
                    name: 'managerId',
                  },
                ],
              },
            },
            {
              title: 'Task',
              name: 'Task',
              formItem: {
                type: EFormType.select,
                rules: [{ type: EFormRuleType.required }],
                col: 6,
                // list:taskname,
                // get: {
                //   facade: CodeFacade,
                //   params: (fullTextSearch: string) => ({
                //     fullTextSearch,
                //     filter: { type: typeCode },
                //     extend: {},
                //   }),
                //   format: (item) => ({
                //     label: item.name,
                //     value: item.code,
                //   }),
                // },
              },
            },
          ]}
          extendButton={(form) => (
            <Button
              text={t('components.button.Save and Add new')}
              className={'md:min-w-[12rem] justify-center out-line !hidden'}
              onClick={() => {
                form.submit();
                isBack.current = false;
              }}
            />
          )}
          handSubmit={handleSubmit}
          disableSubmit={timesheetFacade.isLoading}
          handCancel={handleBack}
          textCancel="Trở về"
          textSubmit="Check in"
        />
      </Spin>
    </div>
  );
};
export default Page;
