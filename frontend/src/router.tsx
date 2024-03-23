import React, { Suspense } from 'react';
import { HashRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { Spin } from 'antd';
import { routerLinks, lang, keyToken } from '@utils';

const pages = [
  {
    layout: React.lazy(() => import('@layouts/auth')),
    isPublic: true,
    child: [
      {
        path: routerLinks('Login'),
        component: React.lazy(() => import('@pages/login')),
      },
      {
        path: routerLinks('ForgetPassword'),
        component: React.lazy(() => import('@pages/forget-password')),
      },
      {
        path: routerLinks('VerifyForotPassword'),
        component: React.lazy(() => import('@pages/forget-password/otp')),
      },
      {
        path: routerLinks('SetPassword'),
        component: React.lazy(() => import('@pages/forget-password/otp/set-password')),
      },
    ],
  },
  {
    layout: React.lazy(() => import('@layouts/admin')),
    isPublic: false,
    child: [
      {
        path: '/',
        component: routerLinks('DayOff/List'),
      },
      {
        path: routerLinks('MyProfile'),
        component: React.lazy(() => import('@pages/my-profile')),
      },
      {
        path: routerLinks('Parameter'),
        component: React.lazy(() => import('@pages/parameter')),
      },
      {
        path: routerLinks('Code'),
        component: React.lazy(() => import('@pages/code')),
      },
      {
        path: routerLinks('Data'),
        component: React.lazy(() => import('@pages/data')),
      },
      {
        path: routerLinks('Post'),
        component: React.lazy(() => import('@pages/post')),
      },
      {
        path: routerLinks('User'),
        component: React.lazy(() => import('@pages/user')),
      },
      {
        path: routerLinks('Team'),
        component: React.lazy(() => import('@pages/team')),
        title: 'Team',
      },
      {
        path: routerLinks('Team/Add'),
        component: React.lazy(() => import('@pages/team/add')),
        title: 'Team/Add',
      },
      {
        path: routerLinks('Team') + '/:id',
        component: React.lazy(() => import('@pages/team/add')),
        title: 'Team/Edit',
      },
      {
        path: routerLinks('Question'),
        component: React.lazy(() => import('@pages/question')),
        title: 'Question',
      },
      {
        path: routerLinks('DayOff') + '/:id',
        component: React.lazy(() => import('@pages/dayoff/add')),
        title: 'DayOff/Edit',
      },
      {
        path: routerLinks('DayOff/List'),
        component: React.lazy(() => import('@pages/dayoff')),
        title: 'DayOff/List',
      },
      {
        path: routerLinks('DayOff/Add'),
        component: React.lazy(() => import('@pages/dayoff/add')),
        title: 'DayOff/Add',
      },
      {
        path: routerLinks('DayOff/Detail') + '/:id',
        component: React.lazy(() => import('@pages/dayoff/detail')),
        title: 'DayOff/Detail',
      },
      {
        path: routerLinks('Dashboard'),
        component: React.lazy(() => import('@pages/dashboard')),
        title: 'Dashboard',
      },
      {
        path: routerLinks('Task'),
        component: React.lazy(() => import('@pages/task')),
        title: 'Task',
      },
      {
        path: routerLinks('Booking'),
        component: React.lazy(() => import('@pages/booking')),
        title: 'Booking',
      },
      {
        path: routerLinks('Booking') + '/:date',
        component: React.lazy(() => import('@pages/booking/detail')),
        title: 'Booking/Detail',
      },
      {
        path: routerLinks('Booking') + '/:date/:typeCode/add',
        component: React.lazy(() => import('@pages/booking/add')),
        title: 'Booking/Add',
      },
      {
        path: routerLinks('TimeSheet'),
        component: React.lazy(() => import('@pages/timesheet/index')),
        title: 'TimeSheet',
      },
      {
        path: routerLinks('TimeSheet') + '/:id' + '/checkin',
        component: React.lazy(() => import('@pages/timesheet/checkin')),
        title: 'checkin',
      },
      {
        path: routerLinks('Task') + '/:id',
        component: React.lazy(() => import('@pages/timesheet/checkin')),
        title: 'checkin',
      },
    ], // 💬 generate link to here
  },
];

const Layout = ({
  layout: Layout,
  isPublic = false,
}: {
  layout: React.LazyExoticComponent<({ children }: { children?: React.ReactNode }) => JSX.Element>;
  isPublic: boolean;
}) => {
  if (isPublic || !!localStorage.getItem(keyToken))
    return (
      <Layout>
        <Outlet />
      </Layout>
    );
  return <Navigate to={`/${lang}${routerLinks('Login')}`} />;
};

const Page = ({ component: Comp }: { component: React.LazyExoticComponent<() => JSX.Element | undefined> }) => <Comp />;
const Pages = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={'/:lang'}>
          {pages.map(({ layout, isPublic, child }, index) => (
            <Route key={index} element={<Layout layout={layout} isPublic={isPublic} />}>
              {child.map(({ path = '', component }, subIndex: number) => (
                <Route
                  key={path + subIndex}
                  path={'/:lang' + path}
                  element={
                    <Suspense
                      fallback={
                        <Spin>
                          <div className="w-screen h-screen" />
                        </Spin>
                      }
                    >
                      {typeof component === 'string' ? (
                        <Navigate to={'/' + lang + component} />
                      ) : (
                        <Page component={component} />
                      )}
                    </Suspense>
                  }
                />
              ))}
            </Route>
          ))}
        </Route>
        <Route path="*" element={<Navigate to={'/' + lang + '/'} />} />
      </Routes>
    </HashRouter>
  );
};

export default Pages;
