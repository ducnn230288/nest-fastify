import React, { Fragment, useEffect } from 'react';
import { t } from 'i18next';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { Gantt, ETaskPriority, ETaskStatus } from '@core/gantt';
import { CodeFacade, GlobalFacade, TaskFacade } from '@store';
import { Plus } from '@svgs';
import { useNavigate } from 'react-router';
import { keyRole, lang, routerLinks } from '@utils';
import { Button } from '@core/button';

const Page = () => {
  const { user, set, formatDate } = GlobalFacade();
  console.log(user)
  const taskFacade = TaskFacade();
  // console.log(taskFacade.result?.data);
  const navigate = useNavigate();
  // const codeFacade = CodeFacade();
  // const request = JSON.parse(codeFacade.queryParams || '{}');
  // const request = JSON.parse(taskFacade.queryParams || '{}');
  useEffect(() => {
    // if (!codeTypeFacade.result?.data) codeTypeFacade.get({});
    set({
      breadcrumbs: [
        { title: 'titles.Task', link: '' },
        { title: 'titles.Task/List', link: '' },
      ],
    });
  }, []);
  

  useEffect(() => {
    if (!taskFacade?.result?.data) {taskFacade.get({});};
  }, [taskFacade?.result]);

  if (taskFacade?.result?.data) {
    const dataTask = taskFacade.result?.data;
    // console.log(dataTask[0].complete)
    // console.log(dayjs(dataTask[0].deadline));
    const task: any =
      dataTask &&
      dataTask.map((data) => ({
        id: data.id,
        name: data.name,
        assignee: '',
        status: ETaskStatus[data.status!],
        priority: ETaskPriority[data.priority!],
        planned: data.planned,
        work: data.work,
        level: data.level,
        startDate: dayjs(data.start),
        endDate: dayjs(data.deadline),
        percent: data.complete,
        
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
            <div className={'float-end intro-x'}>
                    {user?.role?.permissions?.includes(keyRole.P_CODE_CREATE) && (
                      <Button
                        icon={<Plus className="icon-cud !h-5 !w-5" />}
                        text={t('routes.admin.Layout.Add')}
                        onClick={() => navigate(`/${lang}${routerLinks('Task')}/add`)}
                      />
                    )}
                  </div>
            <h1 className="text-3xl text-teal-900 font-bold text-center mb-14 ">{t('routes.auth.login.Welcome')}</h1>
            <Gantt data={task} event={event} />
          </div>
        </Fragment>
      );
      
    }
    
    // const task = [
    //   {
    //     id: '1',
    //     name: 'Start Project',
    //     assignee: '',
    //     status: 'In Progress',
    //     priority: '',
    //     planned: 43,
    //     work: 42,
    //     startDate: dayjs('2015-07-06'),
    //     // percent: 86,
    //     level: 0,
    //     success: '3,5,8',
    //   },
    //   {
    //     id: '2',
    //     name: 'Demolition',
    //     assignee: '',
    //     status: '',
    //     priority: '',
    //     // planned: 43,
    //     // work: 42,
    //     order: 5,
    //     startDate: dayjs('2015-07-06'),
    //     endDate: dayjs('2015-07-15'),
    //     percent: 86,
    //     level: 1,
    //   },
    //   {
    //     id: '3',
    //     name: 'Remove fixtures and cabinets',
    //     assignee: 'Martin Tamer',
    //     status: 'Completed',
    //     priority: 'High',
    //     // planned: 43,
    //     // work: 42,
    //     startDate: dayjs('2015-07-06'),
    //     endDate: dayjs('2015-07-08'),
    //     percent: 1,
    //     level: 2,
    //     success: '4',
    //   },
    //   {
    //     id: '4',
    //     name: 'Demolish interior walls',
    //     assignee: 'Martin Tamer',
    //     status: 'Completed',
    //     priority: 'High',
    //     planned: 43,
    //     work: 42,
    //     startDate: dayjs('2015-07-09'),
    //     endDate: dayjs('2015-07-15'),
    //     percent: 86,
    //     level: 2,
    //     success: '6',
    //   },
    //   {
    //     id: '5',
    //     name: 'Remove siding',
    //     assignee: 'Jack Davolio',
    //     status: 'Completed',
    //     priority: 'Normal',
    //     planned: 14,
    //     work: 18,
    //     startDate: dayjs('2015-07-06'),
    //     endDate: dayjs('2015-07-07'),
    //     percent: 50,
    //     level: 2,
    //     success: '6',
    //   },
    //   {
    //     id: '6',
    //     name: 'Demolition complete',
    //     startDate: dayjs('2015-07-15'),
    //     level: 2,
    //   },
    //   {
    //     id: '7',
    //     name: 'Foundation',
    //     assignee: 'Rose Fuller',
    //     status: 'On Hold',
    //     priority: 'Normal',
    //     planned: 45,
    //     work: 42,
    //     startDate: dayjs('2015-07-06'),
    //     endDate: dayjs('2015-08-07'),
    //     percent: 72,
    //     level: 1,
    //   },
    //   {
    //     id: '8',
    //     name: 'Excavate for foundation',
    //     assignee: 'Fuller King',
    //     status: 'Completed',
    //     priority: 'Critical',
    //     planned: 32,
    //     work: 33,
    //     startDate: dayjs('2015-07-06'),
    //     endDate: dayjs('2015-07-14'),
    //     percent: 100,
    //     level: 2,
    //     success: '9',
    //   },
    //   {
    //     id: '9',
    //     name: 'Build foundation',
    //     assignee: 'Fuller King',
    //     status: 'Completed',
    //     priority: 'Critical',
    //     planned: 32,
    //     work: 33,
    //     startDate: dayjs('2015-07-15'),
    //     endDate: dayjs('2015-07-21'),
    //     percent: 100,
    //     level: 2,
    //     success: '10',
    //   },
    //   {
    //     id: '10',
    //     name: 'Drying Time',
    //     assignee: 'Fuller King',
    //     status: 'Completed',
    //     priority: 'Critical',
    //     planned: 32,
    //     work: 33,
    //     startDate: dayjs('2015-07-22'),
    //     endDate: dayjs('2015-08-04'),
    //     percent: 100,
    //     level: 2,
    //     success: '11',
    //   },
    //   {
    //     id: '11',
    //     name: 'Complete foundation inspection',
    //     assignee: 'Fuller King',
    //     status: 'Completed',
    //     priority: 'Critical',
    //     planned: 32,
    //     work: 33,
    //     startDate: dayjs('2015-08-05'),
    //     endDate: dayjs('2015-08-05'),
    //     percent: 100,
    //     level: 2,
    //     success: '12',
    //   },
    //   {
    //     id: '12',
    //     name: 'Backfill foundation',
    //     assignee: 'Fuller King',
    //     status: 'Completed',
    //     priority: 'Critical',
    //     planned: 32,
    //     work: 33,
    //     startDate: dayjs('2015-08-06'),
    //     endDate: dayjs('2015-08-07'),
    //     percent: 100,
    //     level: 2,
    //     success: '13',
    //   },
    //   {
    //     id: '13',
    //     name: 'Basics complete',
    //     startDate: dayjs('2015-08-07'),
    //     level: 2,
    //   },
    //   {
    //     id: '14',
    //     name: 'Framing, Walls, Door, and Windows',
    //     assignee: '',
    //     status: '',
    //     priority: '',
    //     planned: 43,
    //     work: 42,
    //     startDate: dayjs('2015-08-05'),
    //     endDate: dayjs('2015-08-28'),
    //     percent: 86,
    //     level: 1,
    //   },
    //   {
    //     id: '15',
    //     name: 'Frame roof',
    //     assignee: 'Martin Tamer',
    //     status: 'Completed',
    //     priority: 'High',
    //     planned: 43,
    //     work: 42,
    //     startDate: dayjs('2015-08-10'),
    //     endDate: dayjs('2015-08-14'),
    //     percent: 1,
    //     level: 2,
    //     success: '16',
    //   },
    //   {
    //     id: '16',
    //     name: 'Close in roof',
    //     assignee: 'Martin Tamer',
    //     status: 'Completed',
    //     priority: 'High',
    //     planned: 43,
    //     work: 42,
    //     startDate: dayjs('2015-08-17'),
    //     endDate: dayjs('2015-08-19'),
    //     percent: 86,
    //     level: 2,
    //     success: '17,24',
    //   },
    //   {
    //     id: '17',
    //     name: 'Frame interior walls',
    //     assignee: 'Jack Davolio',
    //     status: 'Completed',
    //     priority: 'Normal',
    //     planned: 14,
    //     work: 18,
    //     startDate: dayjs('2015-08-20'),
    //     endDate: dayjs('2015-08-26'),
    //     percent: 50,
    //     level: 2,
    //     success: '18',
    //   },
    //   {
    //     id: '18',
    //     name: 'Framing complete',
    //     startDate: dayjs('2015-08-26'),
    //     level: 2,
    //     success: '19,20,21',
    //   },
    //   {
    //     id: '19',
    //     name: 'Hang exterior doors',
    //     assignee: 'Martin Tamer',
    //     status: 'Completed',
    //     priority: 'High',
    //     planned: 43,
    //     work: 42,
    //     startDate: dayjs('2015-08-27'),
    //     endDate: dayjs('2015-08-27'),
    //     percent: 1,
    //     level: 2,
    //     success: '22',
    //   },
    //   {
    //     id: '20',
    //     name: 'Install windows',
    //     assignee: 'Martin Tamer',
    //     status: 'Completed',
    //     priority: 'High',
    //     planned: 43,
    //     work: 42,
    //     startDate: dayjs('2015-08-27'),
    //     endDate: dayjs('2015-08-31'),
    //     percent: 86,
    //     level: 2,
    //     success: '22',
    //   },
    //   {
    //     id: '21',
    //     name: 'Install siding',
    //     assignee: 'Jack Davolio',
    //     status: 'Completed',
    //     priority: 'Normal',
    //     planned: 14,
    //     work: 18,
    //     startDate: dayjs('2015-08-27'),
    //     endDate: dayjs('2015-09-02'),
    //     percent: 50,
    //     level: 2,
    //     success: '22',
    //   },
    //   {
    //     id: '22',
    //     name: 'Exterior complete',
    //     startDate: dayjs('2015-09-02'),
    //     level: 2,
    //     success: '38',
    //   },
    //   {
    //     id: '23',
    //     name: 'Interior work',
    //     assignee: '',
    //     status: '',
    //     priority: '',
    //     planned: 43,
    //     work: 42,
    //     startDate: dayjs('2015-08-19'),
    //     endDate: dayjs('2015-09-04'),
    //     percent: 86,
    //     level: 1,
    //   },
    //   {
    //     id: '24',
    //     name: 'Interior finish work begins',
    //     startDate: dayjs('2015-08-19'),
    //     level: 2,
    //     success: '38',
    //   },
    //   {
    //     id: '25',
    //     name: 'Utilities',
    //     assignee: 'Martin Tamer',
    //     status: 'Completed',
    //     priority: 'High',
    //     planned: 43,
    //     work: 42,
    //     startDate: dayjs('2015-08-20'),
    //     endDate: dayjs('2015-08-27'),
    //     percent: 1,
    //     level: 2,
    //   },
    //   {
    //     id: '26',
    //     name: 'Rough-in plumbing',
    //     assignee: 'Martin Tamer',
    //     status: 'Completed',
    //     priority: 'High',
    //     planned: 43,
    //     work: 42,
    //     startDate: dayjs('2015-08-20'),
    //     endDate: dayjs('2015-08-27'),
    //     percent: 86,
    //     level: 3,
    //     success: '30',
    //   },
    //   {
    //     id: '27',
    //     name: 'Rough-in electrical',
    //     assignee: 'Jack Davolio',
    //     status: 'Completed',
    //     priority: 'Normal',
    //     planned: 14,
    //     work: 18,
    //     startDate: dayjs('2015-08-20'),
    //     endDate: dayjs('2015-08-26'),
    //     percent: 50,
    //     level: 3,
    //     success: '30',
    //   },
    //   {
    //     id: '28',
    //     name: 'Rough-in HVAC',
    //     assignee: 'Martin Tamer',
    //     status: 'Completed',
    //     priority: 'High',
    //     planned: 43,
    //     work: 42,
    //     startDate: dayjs('2015-08-20'),
    //     endDate: dayjs('2015-08-25'),
    //     percent: 1,
    //     level: 3,
    //     success: '30',
    //   },
    //   {
    //     id: '29',
    //     name: 'Rough-in communication cabling',
    //     assignee: 'Martin Tamer',
    //     status: 'Completed',
    //     priority: 'High',
    //     planned: 43,
    //     work: 42,
    //     startDate: dayjs('2015-08-20'),
    //     endDate: dayjs('2015-08-21'),
    //     percent: 86,
    //     level: 3,
    //     success: '30',
    //   },
    //   {
    //     id: '30',
    //     name: 'Utilities rough-in complete',
    //     startDate: dayjs('2015-08-27'),
    //     level: 2,
    //     success: '35',
    //   },
    //   {
    //     id: '31',
    //     name: 'Finish interior walls',
    //     assignee: 'Martin Tamer',
    //     status: 'Completed',
    //     priority: 'High',
    //     planned: 43,
    //     work: 42,
    //     startDate: dayjs('2015-08-20'),
    //     endDate: dayjs('2015-08-25'),
    //     percent: 1,
    //     level: 2,
    //   },
    //   {
    //     id: '32',
    //     name: 'Install drywall',
    //     assignee: 'Martin Tamer',
    //     status: 'Completed',
    //     priority: 'High',
    //     planned: 43,
    //     work: 42,
    //     startDate: dayjs('2015-08-20'),
    //     endDate: dayjs('2015-08-24'),
    //     percent: 86,
    //     level: 3,
    //     success: '33',
    //   },
    //   {
    //     id: '33',
    //     name: 'Paint interior',
    //     assignee: 'Jack Davolio',
    //     status: 'Completed',
    //     priority: 'Normal',
    //     planned: 14,
    //     work: 18,
    //     startDate: dayjs('2015-08-23'),
    //     endDate: dayjs('2015-08-25'),
    //     percent: 50,
    //     level: 3,
    //     success: '35',
    //   },

    //   {
    //     id: '34',
    //     name: 'Finish Utilities',
    //     assignee: 'Martin Tamer',
    //     status: 'Completed',
    //     priority: 'High',
    //     planned: 43,
    //     work: 42,
    //     startDate: dayjs('2015-08-27'),
    //     endDate: dayjs('2015-09-04'),
    //     percent: 1,
    //     level: 2,
    //   },
    //   {
    //     id: '35',
    //     name: 'Finish utilities begin',
    //     startDate: dayjs('2015-08-27'),
    //     level: 3,
    //     success: '36,37,38,39',
    //   },
    //   {
    //     id: '36',
    //     name: 'Complete plumbing',
    //     assignee: 'Jack Davolio',
    //     status: 'Completed',
    //     priority: 'Normal',
    //     planned: 14,
    //     work: 18,
    //     startDate: dayjs('2015-08-28'),
    //     endDate: dayjs('2015-09-01'),
    //     percent: 50,
    //     level: 3,
    //     success: '40',
    //   },
    //   {
    //     id: '37',
    //     name: 'Complete electrical wiring',
    //     assignee: 'Martin Tamer',
    //     status: 'Completed',
    //     priority: 'High',
    //     planned: 43,
    //     work: 42,
    //     startDate: dayjs('2015-08-28'),
    //     endDate: dayjs('2015-09-03'),
    //     percent: 1,
    //     level: 3,
    //     success: '40',
    //   },
    //   {
    //     id: '38',
    //     name: 'Complete communication cabling',
    //     assignee: 'Martin Tamer',
    //     status: 'Completed',
    //     priority: 'High',
    //     planned: 43,
    //     work: 42,
    //     startDate: dayjs('2015-09-03'),
    //     endDate: dayjs('2015-09-04'),
    //     percent: 86,
    //     level: 3,
    //     success: '40',
    //   },
    //   {
    //     id: '39',
    //     name: 'Complete HVAC',
    //     assignee: 'Jack Davolio',
    //     status: 'Completed',
    //     priority: 'Normal',
    //     planned: 14,
    //     work: 18,
    //     startDate: dayjs('2015-08-28'),
    //     endDate: dayjs('2015-08-28'),
    //     percent: 50,
    //     level: 3,
    //     success: '40',
    //   },
    //   {
    //     id: '40',
    //     name: 'Complete Project',
    //     startDate: dayjs('2015-09-04'),
    //     level: 3,
    //   },
    // ];
  
    
    // const event = [
    //   {
    //     name: 'New Year holiday',
    //     startDate: dayjs('2015-07-15'),
    //     endDate: dayjs('2015-07-16'),
    //   },
    //   {
    //     name: 'Christmas holidays',
    //     startDate: dayjs('2015-08-15'),
    //     endDate: dayjs('2015-08-15'),
    //   },
    //   {
    //     name: 'Q-1 Release',
    //     startDate: dayjs('2015-07-09'),
    //   },
    //   {
    //     name: 'Q-2 Release',
    //     startDate: dayjs('2015-07-30'),
    //   },
    //   {
    //     name: 'Q-3 Release',
    //     startDate: dayjs('2015-08-10'),
    //   },
    // ];

    
    
};

export default Page;
