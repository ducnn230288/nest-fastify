import React, { Fragment, useEffect } from 'react';
import { t } from 'i18next';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { Gantt, ETaskPriority, ETaskStatus } from '@core/gantt';
import { TaskFacade } from '@store';

const Page = () => {
  const taskFacade = TaskFacade();

  
  useEffect(() => {
    if(!taskFacade?.result?.data) 
      taskFacade.get({})   

  },[taskFacade?.result])

  if(taskFacade?.result?.data) {
    const dataTask = taskFacade.result?.data;
    const task =
      dataTask &&
      dataTask.map((data) => ({
        id: data.id,
        name: data.name,
        assignee: '',
        status: ETaskStatus[data.status!],
        priority: ETaskPriority[data.priority!],
        planned: data.planned,
        work: data.work,
        percent: data.percent,
        level: data.level,
        startDate: dayjs(data.start),
        success: data.success,
        
      }));

    const event = [
    {
      name: 'New Year holiday',
      startDate: dayjs('2015-07-15'),
      endDate: dayjs('2015-07-16'),
    },
    {
      name: 'Christmas holidays',
      startDate: dayjs('2015-08-15'),
      endDate: dayjs('2015-08-15'),
    },
    {
      name: 'Q-1 Release',
      startDate: dayjs('2015-07-09'),
    },
    // {
    //   name: 'Q-2 Release',
    //   startDate: dayjs('2015-07-30'),
    // },
    // {
    //   name: 'Q-3 Release',
    //   startDate: dayjs('2015-08-10'),
    // },
    ];
    

    
    
  return (
    <Fragment>
      <div className="h-full pb-10">
        <h1 className="text-3xl text-teal-900 font-bold text-center mb-14 ">{t('routes.auth.login.Welcome')}</h1>
        <Gantt data={task} event={event} />
      </div>
    </Fragment>
  );
  }
};

export default Page;
