import { CheckboxOptionType } from 'antd';
import { keyToken, language, languages, linkApi } from './variable';
// @ts-ignore
import { io } from 'socket.io-client';
import * as ReactDOMServer from 'react-dom/server';
import React, { Fragment } from 'react';
import classNames from 'classnames';
import { Arrow } from '@svgs';

export * from './init/reportWebVitals';
export * from './api';
export * from './variable';
export * from '../router-links';
export * from './convertFormValue';

export const socket = io(import.meta.env.VITE_URL_SOCKET, { autoConnect: false });
export const cleanObjectKeyNull = (obj: { [selector: string]: any }) => {
  for (const propName in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, propName)) {
      if (
        obj[propName] === null ||
        obj[propName] === undefined ||
        (typeof obj[propName] === 'object' && Object.keys(obj[propName]).length === 0)
      ) {
        delete obj[propName];
      } else if (typeof obj[propName] === 'object') {
        const keys = Object.keys(obj[propName]);
        let check = true;
        keys.forEach((key: string) => {
          if (check && obj[propName][key] !== undefined) {
            check = false;
          }
        });
        if (check) {
          delete obj[propName];
        }
      }
    }
  }
  return obj;
};

export const getSizePageByHeight = (height = 39, minusNumber = 3) =>
  Math.floor(
    (document.body.getBoundingClientRect().height -
      document.getElementsByTagName('tbody')[0].getBoundingClientRect().top) /
      height,
  ) - minusNumber;
export const getFilter = (queryParams = '{}', key = 'id') =>
  JSON.parse(JSON.parse(queryParams || '{}').filter || '{}')[key] || null;

export const loopMapSelect = (array?: any[], label = 'name', value = 'id'): CheckboxOptionType[] =>
  array?.length
    ? array.map((item) => ({
        label: item[label],
        value: item[value],
        isLeaf: !item.children.length,
        children: item.children ? loopMapSelect(item.children, label, value) : undefined,
      }))
    : [];

export const lang = languages.indexOf(location.hash.split('/')[1]) > -1 ? location.hash.split('/')[1] : language;

export const arrayUnique = (array: any, key?: string) => {
  const a = array.concat();
  for (let i = 0; i < a.length; ++i) {
    for (let j = i + 1; j < a.length; ++j) {
      if (key && a[i][key] === a[j][key]) a.splice(j--, 1);
      else if (JSON.stringify(a[i]) === JSON.stringify(a[j])) a.splice(j--, 1);
    }
  }
  return a;
};

export const handleDownloadCSV = async (url: string, name: string = 'file-csv') => {
  const res = await fetch(linkApi + url, {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      authorization: 'Bearer ' + (localStorage.getItem(keyToken) || ''),
      'Accept-Language': localStorage.getItem('i18nextLng') || '',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });
  if (res.status < 300) {
    const text = await res.text();
    const link = window.document.createElement('a');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(text));
    link.setAttribute('download', name + '.csv');
    link.click();
  }
};

export const uuidv4 = () => {
  let d = new Date().getTime(); //Timestamp
  let d2 = (typeof performance !== 'undefined' && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
};
export const renderTitleBreadcrumbs = (title: string, breadcrumbs: { title: string; link: string }[]) => {
  document.title = title;
  document.querySelectorAll('.title-page').forEach((e) => (e.innerHTML = title));
  document.querySelectorAll('.breadcrumbs-page').forEach(
    (e) =>
      (e.innerHTML = ReactDOMServer.renderToStaticMarkup(
        breadcrumbs.map((item, i) => (
          <Fragment key={i}>
            <span className={classNames({ 'text-gray-400': i < breadcrumbs.length - 1 })}>{item.title}</span>{' '}
            {i < breadcrumbs.length - 1 && <Arrow className={'w-2.5 h-2.5 mx-1.5'} />}
          </Fragment>
        )),
      )),
  );
};
export const isNumeric = (str: string) => {
  return !isNaN(Number(str)) && !isNaN(parseFloat(str));
};

export const mapTreeObject = (item: any) => {
  return {
    ...item,
    title: item?.name,
    key: item?.code || item?.id,
    value: item?.code || item?.id,
    isLeaf: !item?.children?.length,
    expanded: true,
    children: !item?.children ? null : item?.children?.map((i: any) => mapTreeObject(i)),
  } as any;
};
export const textWidth = (text?: string, fontProp?: string) => {
  if (text) {
    const tag = document.createElement('div');
    tag.style.position = 'absolute';
    tag.style.left = '-999em';
    tag.style.whiteSpace = 'nowrap';
    if (fontProp) tag.style.font = fontProp;
    tag.innerHTML = text;
    document.body.appendChild(tag);
    const result = tag.clientWidth;
    document.body.removeChild(tag);
    return result;
  }
  return 0;
};
export const getLongTextInArray = (arr: string[]) => arr.reduce((a, b) => (a.length > b.length ? a : b));
export const reorderArray = (list: any[], startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
export const cssInObject = (styles: string) =>
  styles
    ? styles
        .trim()
        .split(';')
        .map((cur) =>
          cur
            .trim()
            .split(':')
            .map((i) => i.trim()),
        )
        .filter((i) => i.length === 2)
        .reduce((acc: any, val) => {
          const [key, value] = val;
          const newKey = key.replace(/-./g, (css) => css.toUpperCase()[1]);
          acc[newKey] = value;
          return acc;
        }, {})
    : {};
