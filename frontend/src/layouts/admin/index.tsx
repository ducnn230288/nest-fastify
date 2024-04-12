import React, { PropsWithChildren, useEffect } from 'react';
import { Dropdown, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { Avatar } from '@core/avatar';
import { GlobalFacade } from '@store';
import { Key, Out, User, Arrow, Logo } from '@svgs';
import { routerLinks, lang } from '@utils';
import './index.less';
import Menu from './menu';

const Layout = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation();
  const globalFacade = GlobalFacade();
  const { user } = globalFacade;

  const navigate = useNavigate();
  const location = useLocation();

  const [, contextHolder] = notification.useNotification();

  useEffect(() => {
    setTimeout(() => changeCollapsed(), 200);
    if (innerWidth < 1280 && !document.querySelectorAll('main')[0]?.classList?.contains('isCollapsed')) {
      setTimeout(() => changeCollapsed());
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });

    function handleResize() {
      if (innerWidth < 1280 && !document.querySelectorAll('main')[0]?.classList?.contains('isCollapsed')) {
        changeCollapsed();
      }
    }
    window.addEventListener('resize', handleResize, { passive: true });

    // socket.connect();
    // socket.on('error', (message) =>
    //   api.error({
    //     message,
    //     placement: 'topRight',
    //   }),
    // );
    return () => {
      window.removeEventListener('resize', handleResize, true);
      // socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (innerWidth < 1280 && !document.querySelectorAll('main')[0]?.classList?.contains('isCollapsed')) {
      changeCollapsed();
    }
  }, [location]);
  useEffect(() => {
    if (globalFacade.pathname && globalFacade.pathname !== location.hash.substring(1)) {
      globalFacade.set({ pathname: '' });
      navigate(globalFacade.pathname);
    }
  }, [globalFacade.pathname]);

  const Header = () => (
    <header
      className={
        'div3 bg-white w-full h-16 transition-all duration-300 ease-in-out top-0 block sm:bg-gray-100 z-20 fixed lg:relative pl-64'
      }
    >
      <div className="flex items-center justify-end sm:justify-between px-5 h-16">
        <div className={'div6'}>
          <h1 className={'title-page text-xl font-bold hidden sm:block'}></h1>

          <div className={'breadcrumbs-page hidden sm:flex items-center text-xs mt-0.5'}></div>
        </div>

        <div className="flex items-center gap-5 absolute right-6">
          <Dropdown
            trigger={['click']}
            menu={{
              items: [
                {
                  key: '0',
                  className: 'hover:!bg-white !border-b-slate-300 border-b !rounded-none',
                  label: (
                    <div className="flex">
                      <Avatar src={user?.avatar || ''} size={8} />
                      <div className="text-left leading-none mr-3 block pl-2">
                        <div className="font-semibold text-black text-sm leading-snug mb-0.5">{user?.name}</div>
                        <div className="text-gray-500 text-[10px]">{user?.email}</div>
                      </div>
                    </div>
                  ),
                },
                {
                  key: '1',
                  className: 'h-11',
                  label: (
                    <div
                      className="flex"
                      onClick={() => navigate(`/${lang}${routerLinks('MyProfile')}?tab=1`, { replace: true })}
                    >
                      <div className="flex items-center">
                        <User className="w-6 h-6 pr-2 text-black" />
                      </div>
                      <div>{t('routes.admin.Layout.My Profile')}</div>
                    </div>
                  ),
                },
                {
                  key: '2',
                  className: 'h-11 !border-b-slate-300 border-b !rounded-none',
                  label: (
                    <div
                      className="flex"
                      onClick={() => navigate(`/${lang}${routerLinks('MyProfile')}?tab=2`, { replace: true })}
                    >
                      <div className="flex items-center">
                        <Key className="w-6 h-6 pr-2 text-black" />
                      </div>
                      <div>{t('routes.admin.Layout.Change Password')}</div>
                    </div>
                  ),
                },
                {
                  key: '3',
                  className: 'h-11',
                  label: (
                    <div
                      className="flex"
                      onClick={() => navigate(`/${lang}${routerLinks('Login')}`, { replace: true })}
                    >
                      <div className="flex items-center">
                        <Out className="w-6 h-6 pr-2 text-black" />
                      </div>
                      <div>{t('routes.admin.Layout.Sign out')}</div>
                    </div>
                  ),
                },
              ],
            }}
            placement="bottomRight"
          >
            <section className="flex items-center !rounded-full" id={'dropdown-profile'}>
              <Avatar src={user?.avatar || ''} size={10} />
            </section>
          </Dropdown>
        </div>
      </div>
    </header>
  );
  return (
    <main className={classNames({ isCollapsed: !(innerWidth < 1280) })}>
      {contextHolder}
      <div className="leading-10" />
      <div className="h-16 relative">
        <div className="absolute top-0 left-0 right-0">
          <Header />
        </div>
      </div>
      <div
        className={
          'div5 flex items-center justify-between bg-white sm:bg-teal-900 text-gray-800 hover:text-gray-500 h-16 fixed top-0 left-0 pr-5 pl-3 font-bold transition-all duration-300 ease-in-out rounded-tr-3xl z-20'
        }
      >
        <div className="flex">
          <div className={'div11 hamburger sm:!hidden'} onClick={() => changeCollapsed()}>
            <span className="line" />
            <span className="line" />
            <span className="line" />
          </div>

          <a href="/vn/dashboard" className="flex items-center group">
            <Logo className={'div12 w-12 mr-3 text-white'} />
            <div
              id={'name-application'}
              className={
                'div13 transition-all duration-300 ease-in-out absolute text-white left-16 overflow-ellipsis overflow-hidden ml-5'
              }
            >
              Admin
            </div>
          </a>
        </div>
        <div className={'div11 relative'} onClick={() => changeCollapsed()}>
          <Arrow className={'div10 w-9 text-white transition-all duration-300 ease-in-out'} />
        </div>
      </div>
      <div className={'div4 fixed z-30 top-16 left-0 h-screen bg-teal-900 transition-all duration-300 ease-in-out'}>
        <Menu
          isCollapsed={document.querySelectorAll('main')[0]?.classList?.contains('isCollapsed')}
          permission={user?.role?.permissions}
        />
      </div>
      {!document.querySelectorAll('main')[0]?.classList?.contains('isCollapsed') && !(innerWidth > 1280) && (
        <div className={'w-full h-full fixed bg-black opacity-30 z-20'} onClick={() => changeCollapsed()} />
      )}
      <section id={'main'} className={'div7 px-2 sm:px-0 transition-all duration-300 ease-in-out z-10 relative'}>
        <div className={'h-[calc(100vh-6rem)] overflow-auto'}>
          {!(innerWidth > 1280) && <h1 className={'title-page text-xl font-bold block sm:hidden'}></h1>}
          <div className={'breadcrumbs-page flex items-center text-xs mt-0.5 pb-5 sm:hidden'}></div>
          {children}
        </div>

        <footer className="text-center pt-1.5 w-full">{t('layout.footer', { year: new Date().getFullYear() })}</footer>
      </section>
    </main>
  );
};
const changeCollapsed = () => {
  document.querySelectorAll('main')[0]?.classList?.toggle('isCollapsed');
  const listElement = [
    {
      classId: 'div5',
      condition: !document.querySelectorAll('main')[0]?.classList?.contains('isCollapsed') && innerWidth > 1280,
      toggleClass: 'w-64',
    },
    {
      classId: 'div5',
      condition: document.querySelectorAll('main')[0]?.classList?.contains('isCollapsed') && innerWidth > 1280,
      toggleClass: 'w-16',
    },
    {
      classId: 'main',
      condition: !document.querySelectorAll('main')[0]?.classList?.contains('isCollapsed') && innerWidth > 1280,
      toggleClass: 'ml-64',
    },
    {
      classId: 'main',
      condition: document.querySelectorAll('main')[0]?.classList?.contains('isCollapsed') && innerWidth > 1280,
      toggleClass: 'ml-16',
    },
    {
      classId: 'div4',
      condition: !document.querySelectorAll('main')[0]?.classList?.contains('isCollapsed'),
      toggleClass: 'w-64',
    },
    {
      classId: 'div4',
      condition: document.querySelectorAll('main')[0]?.classList?.contains('isCollapsed'),
      toggleClass: 'w-16',
    },
    {
      classId: 'div4',
      condition: document.querySelectorAll('main')[0]?.classList?.contains('isCollapsed') && !(innerWidth > 1280),
      toggleClass: '!-left-20',
    },
    {
      classId: 'div7',
      condition: !document.querySelectorAll('main')[0]?.classList?.contains('isCollapsed') && innerWidth > 1280,
      toggleClass: 'ml-64',
    },
    {
      classId: 'div7',
      condition: document.querySelectorAll('main')[0]?.classList?.contains('isCollapsed') && innerWidth > 1280,
      toggleClass: 'ml-16',
    },
    {
      classId: 'div1',
      condition:
        (document.querySelectorAll('main')[0]?.classList?.contains('isCollapsed') && innerWidth > 1280) ||
        (!document.querySelectorAll('main')[0]?.classList?.contains('isCollapsed') && !(innerWidth > 1280)),
      toggleClass: 'is-active',
    },
    {
      classId: 'div6',
      condition: document.querySelectorAll('main')[0]?.classList?.contains('isCollapsed'),
      toggleClass: 'xl:ml-7',
    },
    {
      classId: 'div3',
      condition: !document.querySelectorAll('main')[0]?.classList?.contains('isCollapsed') && innerWidth > 1280,
      toggleClass: 'pl-64',
    },
    {
      classId: 'div3',
      condition: document.querySelectorAll('main')[0]?.classList?.contains('isCollapsed') && innerWidth > 1280,
      toggleClass: 'pl-16',
    },
    {
      classId: 'div10',
      condition: !document.querySelectorAll('main')[0]?.classList?.contains('isCollapsed') && innerWidth > 1280,
      toggleClass: 'rotate-180',
    },
    {
      classId: 'div11',
      condition:
        (document.querySelectorAll('main')[0]?.classList?.contains('isCollapsed') && innerWidth > 1280) ||
        (!document.querySelectorAll('main')[0]?.classList?.contains('isCollapsed') && !(innerWidth > 1280)),
      toggleClass: 'is-active',
    },
    {
      classId: 'div12',
      condition:
        (!document.querySelectorAll('main')[0]?.classList?.contains('isCollapsed') && innerWidth > 1280) ||
        (document.querySelectorAll('main')[0]?.classList?.contains('isCollapsed') && !(innerWidth > 1280)),
      toggleClass: ['opacity-100', 'text-lg', 'w-12'],
    },
    {
      classId: 'div13',
      condition: !document.querySelectorAll('main')[0]?.classList?.contains('isCollapsed') && innerWidth > 1280,
      toggleClass: ['opacity-100', 'text-xl'],
    },
    {
      classId: 'div13',
      condition: document.querySelectorAll('main')[0]?.classList?.contains('isCollapsed') || !(innerWidth > 1280),
      toggleClass: ['opacity-0', 'text-[0px]', 'hidden'],
    },
    {
      classId: 'div14',
      condition: document.querySelectorAll('main')[0]?.classList?.contains('isCollapsed'),
      toggleClass: ['justify-center', 'h-10'],
    },
    {
      classId: 'div15',
      condition: document.querySelectorAll('main')[0]?.classList?.contains('isCollapsed'),
      toggleClass: 'absolute',
    },
    {
      classId: 'div16',
      condition: !document.querySelectorAll('main')[0]?.classList?.contains('isCollapsed'),
      toggleClass: 'opacity-100',
    },
    {
      classId: 'div17',
      condition: document.querySelectorAll('main')[0]?.classList?.contains('isCollapsed'),
      toggleClass: 'hidden',
    },
    {
      classId: 'div18',
      condition: document.querySelectorAll('main')[0]?.classList?.contains('isCollapsed'),
      toggleClass: 'justify-center',
    },
    {
      classId: 'div19',
      condition: !document.querySelectorAll('main')[0]?.classList?.contains('isCollapsed'),
      toggleClass: 'ml-1',
    },
    {
      classId: 'div20',
      condition: !document.querySelectorAll('main')[0]?.classList?.contains('isCollapsed'),
      toggleClass: 'opacity-100',
    },
    {
      classId: 'div20',
      condition: document.querySelectorAll('main')[0]?.classList?.contains('isCollapsed'),
      toggleClass: ['opacity-0', 'text-[0]'],
    },
    {
      classId: 'div21',
      condition: document.querySelectorAll('main')[0]?.classList?.contains('isCollapsed'),
      toggleClass: 'hidden',
    },
    {
      classId: 'div22',
      condition: !document.querySelectorAll('main')[0]?.classList?.contains('isCollapsed'),
      toggleClass: 'hidden',
    },
  ];
  listElement.forEach((item) => {
    const element = document.getElementsByClassName(item.classId);
    if (element.length && item.condition) {
      Array.from(element).forEach((el) => {
        if (Array.isArray(item.toggleClass)) el?.classList?.add(...item.toggleClass);
        else el?.classList?.add(item.toggleClass);
      });
    } else {
      Array.from(element).forEach((el) => {
        if (Array.isArray(item.toggleClass)) el?.classList?.remove(...item.toggleClass);
        else el?.classList?.remove(item.toggleClass);
      });
    }
  });
};
export default Layout;
