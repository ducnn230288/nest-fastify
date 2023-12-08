import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { Spin } from 'antd';
import dayjs from 'dayjs';

import { Booking, GlobalFacade, BookingFacade, CodeFacade, CodeTypeFacade, TimeSheetFacade, TaskFacade } from '@store';
import { routerLinks, lang } from '@utils';
import { Button } from '@core/button';
import { Form } from '@core/form';
import { EStatusState, EFormRuleType, EFormType } from '@models';
import { title } from 'process';
const Page = () => {
  const [projectname, setProjectName] = useState([]);
  const [taskname, setTaskName] = useState([]);
  const { id, date, typeCode } = useParams();
  const timesheetFacade = TimeSheetFacade();
  const { set } = GlobalFacade();
  const isReload = useRef(false);
  const param = JSON.parse(timesheetFacade.queryParams || '{}');
  const taskFacade=TaskFacade()
  // useEffect(() => {
  //   if (id) timesheetFacade.getById({ id });
  //   else timesheetFacade.set({ data: undefined });
  //   set({
  //     breadcrumbs: [
  //       { title: 'titles.Booking', link: '' },
  //       { title: 'titles.Booking/List', link: '' },
  //       { title: 'pages.Booking/Detail', link: '' },
  //       { title: id ? 'pages.Booking/Edit' : 'pages.Booking/Add', link: '' },
  //     ],
  //     titleOption: { date },
  //   });
  //   return () => {
  //     isReload.current && timesheetFacade.get(param);
  //   };
  // }, [id]);
  const navigate = useNavigate();
  const isBack = useRef(true);
  // useEffect(() => {
  //   switch (timesheetFacade.status) {
  //     case EStatusState.postFulfilled:
  //     case EStatusState.putFulfilled:
  //       timesheetFacade.get(JSON.parse(timesheetFacade.queryParams || '{}'));
  //       if (Object.keys(param).length > 0) isReload.current = true;
  //       if (isBack.current) handleBack();
  //       else {
  //         isBack.current = true;
  //         navigate(`/${lang}${routerLinks('Booking')}/${date}/add`);
  //       }
  //       break;
  //   }
  // }, [timesheetFacade.status]);

  // const codeTypeFacade = CodeTypeFacade();
  // useEffect(() => {
  //   if (!codeTypeFacade.result?.data?.length) codeTypeFacade.get({});
  // }, []);
  // useEffect(() => {
  //   if (codeTypeFacade.result?.data?.length) {
  //     set({
  //       titleOption: { date, type: codeTypeFacade.result?.data?.filter((item) => item.code === typeCode)[0]?.name },
  //     });
  //     if (!codeTypeFacade?.result?.data?.filter((item) => item.code === typeCode).length) {
  //       navigate({
  //         pathname: location.hash
  //           .substring(1)
  //           .replace(`/${typeCode}/`, id && timesheetFacade.data?.type ? `/${timesheetFacade.data?.type}/` : '/room/'),
  //       });
  //     }
  //   }
  // }, [codeTypeFacade.result]);
  const handleBack = () => navigate(`/${lang}${routerLinks('TimeSheet')}`);
  const handleSubmit = (values: Booking) => {
    values.startTime = dayjs(values.time![0].format('HH:mm') + ' ' + date).toISOString();
    values.endTime = dayjs(values.time![1].format('HH:mm') + ' ' + date).toISOString();
    delete values.time;
    // if (id) timesheetFacade.put({ ...values, typeCode, id });
    // else timesheetFacade.post({ ...values, typeCode });
  };
  useEffect(() => {
    if (id) {
      const fetchData=async ()=>{
        const res=await taskFacade.getById({id})
        const data= res && res?.payload?.data
        // console.log(data?.works?.[0]?.task?.project?.name )
       console.log(taskFacade)
        const transformed = data?.works?.map((work: { task: { project: { name: any; }; }; }) => ({
          name: work?.task?.project?.name,
          label: work?.task?.project?.name,
        })) || [];
        setProjectName(transformed);
        const transformedtask =data?.works?.map((work: { task: { name: any; }; }) => ({
          value: work?.task?.name,
          label: work?.task?.name,
        })) || [];
        setTaskName(transformedtask);
      } 
      fetchData()
    }
  }, [id]);
  const { t } = useTranslation();
  return (
    <div className={'max-w-3xl mx-auto bg-white p-4 shadow rounded-xl'}>
      <Spin spinning={timesheetFacade.isLoading}>
        <Form
          values={{ ...timesheetFacade.data }}
          className="intro-x"
          columns={[
            {
              title: 'Project',
              name: 'Project',
              formItem: {
                type: EFormType.addable,
               column:[
                {
                  name:"project",
                  title:"project"
                },
                
               ],
               
                rules: [{ type: EFormRuleType.required }],
                col: 6,
                onAdd:()=>{
                  projectname
                },
                
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
            textCancel='Trở về'
            textSubmit='Check in'
        />
      </Spin>
    </div>
  );
};
export default Page;
