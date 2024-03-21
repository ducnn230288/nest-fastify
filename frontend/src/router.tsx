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
        component: routerLinks('Dashboard'),
      },
      {
        path: routerLinks('MyProfile'),
        component: React.lazy(() => import('@pages/my-profile')),
      },
      {
        path: routerLinks('Dashboard'),
        component: React.lazy(() => import('@pages/dashboard')),
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
        path: routerLinks('Data') + '/:type/add',
        component: React.lazy(() => import('@pages/data/add')),
      },
      {
        path: routerLinks('Data') + '/:type/:id/edit',
        component: React.lazy(() => import('@pages/data/add')),
      },
      {
        path: routerLinks('DataType') + '/add',
        component: React.lazy(() => import('@pages/data/type/add')),
      },
      {
        path: routerLinks('DataType') + '/:id/edit',
        component: React.lazy(() => import('@pages/data/type/add')),
      },
      {
        path: routerLinks('Post'),
        component: React.lazy(() => import('@pages/post')),
      },
      {
        path: routerLinks('Post') + '/:type/add',
        component: React.lazy(() => import('@pages/post/add')),
      },
      {
        path: routerLinks('Post') + '/:type/:id/edit',
        component: React.lazy(() => import('@pages/post/add')),
      },
      {
        path: routerLinks('PostType') + '/add',
        component: React.lazy(() => import('@pages/post/type/add')),
      },
      {
        path: routerLinks('PostType') + '/:id/edit',
        component: React.lazy(() => import('@pages/post/type/add')),
      },
      {
        path: routerLinks('User'),
        component: React.lazy(() => import('@pages/user')),
      },
      {
        path: routerLinks('User') + '/:roleCode/add',
        component: React.lazy(() => import('@pages/user/add')),
      },
      {
        path: routerLinks('User') + '/:roleCode/:id/edit',
        component: React.lazy(() => import('@pages/user/add')),
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
