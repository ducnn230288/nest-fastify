import { Collapse, Popover } from 'antd';
import React, { Fragment, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useNavigate, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { createSearchParams } from 'react-router-dom';

import { routerLinks, lang, uuidv4 } from '@utils';
import listMenu from '../menus';
import './index.less';

const Layout = ({ isCollapsed = false, permission = [] }: { isCollapsed: boolean; permission?: string[] }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const refMenu = useRef<HTMLUListElement>(null);
  const clearTime = useRef<NodeJS.Timeout>();

  const menuActive = useRef<string[]>([]);
  useEffect(() => {
    clearTimeout(clearTime.current);
    let linkActive = '';
    listMenu.forEach((item) => {
      if (!linkActive && !!item.child && location.hash.substring(1).indexOf(`/${lang}${routerLinks(item.name)}`) > -1) {
        linkActive = `/${lang}${routerLinks(item.name)}`;
      }
    });
    clearTime.current = setTimeout(() => (menuActive.current = [linkActive]), 200);
  }, [location.hash]);

  useEffect(() => {
    if (document.querySelectorAll('main')[0]?.classList?.contains('isCollapsed')) refMenu!.current!.scrollTop = 0;
  }, [document.querySelectorAll('main')[0]?.classList?.contains('isCollapsed')]);

  const subMenu = (child: any[]) => (
    <ul className={'menu'}>
      {child
        .filter((subItem) => !subItem.permission || permission?.includes(subItem.permission))
        .map((subItem, index: number) => (
          <li
            key={index + uuidv4()}
            className={classNames(
              'group flex items-center pl-9 py-2 cursor-pointer rounded-2xl text-gray-300 font-medium text-base',
              {
                'bg-teal-700 text-white !fill-gray-300':
                  location.pathname.indexOf(`/${lang}${routerLinks(subItem.name)}`) > -1,
              },
            )}
            onClick={() =>
              location.pathname.indexOf(`/${lang}${routerLinks(subItem.name)}`) === -1 &&
              navigate({
                pathname: `/${lang}${routerLinks(subItem.name)}`,
                search: `?${createSearchParams(subItem.queryParams)}`,
              })
            }
          >
            <p className="h-1 w-1 mr-3 rounded-lg bg-white group-hover:w-2 duration-300 ease-in-out transition-all"></p>
            <a className="hover:text-white sub-menu">
              <span>{t(`titles.${subItem.name}`)}</span>
            </a>
          </li>
        ))}
    </ul>
  );

  return (
    <ul className="menu relative h-[calc(100vh-5rem)] " id={'menu-sidebar'} ref={refMenu}>
      {listMenu
        .filter((item) => {
          return (
            !item.child ||
            item.child.filter((subItem) => !subItem.permission || permission?.includes(subItem.permission)).length > 0
          );
        })
        .map((item, index) => {
          if (!item.child) {
            return (
              <li
                className={classNames(
                  'div14 flex items-center text-gray-300 h-12 m-2 relative cursor-pointer py-1 px-2',
                  {
                    'bg-teal-700 text-white !fill-gray-300 rounded-2xl opacity-100':
                      location.pathname === `/${lang}${routerLinks(item.name)}`,
                    'fill-gray-300': location.pathname !== `/${lang}${routerLinks(item.name)}`,
                  },
                )}
                onClick={() =>
                  location.pathname !== `/${lang}${routerLinks(item.name)}` &&
                  navigate({
                    pathname: `/${lang}${routerLinks(item.name)}`,
                    search: `?${createSearchParams(item.queryParams)}`,
                  })
                }
                key={index}
              >
                <div className={'div15'}>{item.icon}</div>
                <p
                  className={classNames(
                    'div17 ml-2.5 transition-all duration-300 ease-in-out font-medium text-base !h-8 flex items-center',
                  )}
                >
                  {t(`titles.${item.name}`)}
                </p>
              </li>
            );
          } else {
            return (
              <Fragment key={index}>
                <div className="div22">
                  <Popover placement="rightTop" trigger={'hover'} content={subMenu(item.child)}>
                    <li className="flex items-center justify-center h-12 m-2 px-2 text-gray-300 fill-gray-300 ">
                      <div className={classNames({ 'ml-1': !isCollapsed })}>{item.icon}</div>
                    </li>
                  </Popover>
                </div>
                <li className="div21 my-1 px-1">
                  <Collapse
                    accordion
                    bordered={false}
                    className={classNames('bg-teal-900', {
                      'active-menu': location.pathname.indexOf(`/${lang}${routerLinks(item.name)}`) > -1,
                    })}
                    defaultActiveKey={menuActive.current}
                    items={[
                      {
                        key: `/${lang}${routerLinks(item.name)}`,
                        showArrow: !isCollapsed,
                        label: (
                          <ul>
                            <li className={'div18 flex items-center text-gray-300 fill-gray-300 menu'}>
                              <span className={'div19'}>{item.icon}</span>
                              <span
                                className={
                                  'div20 pl-2.5 transition-all duration-300 ease-in-out font-medium text-base text-gray-300'
                                }
                              >
                                {t(`titles.${item.name}`)}
                              </span>
                            </li>
                          </ul>
                        ),
                        children: subMenu(item.child),
                      },
                    ]}
                  />
                </li>
              </Fragment>
            );
          }
        })}
    </ul>
  );
};

export default Layout;
