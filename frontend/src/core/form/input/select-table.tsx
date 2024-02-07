import React, { useRef } from 'react';
import classNames from 'classnames';
import { Dropdown } from 'antd';
import { ETableFilterType, TableRefObject } from '@models';
import dayjs from 'dayjs';
import { DataTable } from '@core/data-table';
import { CodeFacade, GlobalFacade } from '@store';

const Component = ({
  onChange,
  value = [],
  placeholder,
  disabled,
}: {
  onChange?: (values: any[]) => void;
  value?: any[];
  placeholder: string;
  disabled: boolean;
}) => {
  const refSelect = useRef<HTMLDivElement>(null);

  const onBlur = () => {
    const arrowDown = refSelect.current!.querySelector('.arrow-down');
    const search = refSelect.current?.querySelector('.search');
    arrowDown?.classList.toggle('opacity-100');
    arrowDown?.classList.toggle('opacity-0');
    search?.classList.toggle('opacity-100');
    search?.classList.toggle('opacity-0');
  }
  const onFocus = () => {
    const arrowDown = refSelect.current?.querySelector('.arrow-down');
    const search = refSelect.current?.querySelector('.search');
    arrowDown?.classList.toggle('opacity-100');
    arrowDown?.classList.toggle('opacity-0');
    search?.classList.toggle('opacity-100');
    search?.classList.toggle('opacity-0');
  }
  const { formatDate } = GlobalFacade();
  const codeFacade = CodeFacade();
  const table = useRef<TableRefObject>(null);
  const input = useRef<HTMLInputElement>(null);

  return (
    <div
      ref={refSelect}
      className={classNames('relative', { 'bg-gray-100': disabled })}
    >
      <Dropdown
        overlayStyle={{width: '0%'}}
        trigger={['click']}
        dropdownRender={() => (
          <div className={'bg-white drop-shadow-lg rounded-xl overflow-hidden'}>
            <DataTable
              ref={table}
              facade={codeFacade}
              showPagination={false}
              showSearch={false}
              defaultRequest={{page: 1, perPage: 10,}}
              save={false}
              onRow={(e) => ({onClick: () => input.current!.value = e.name})}
              columns={[
                {
                  title: 'titles.Code',
                  name: 'code',
                  tableItem: {
                    width: 100,
                    filter: { type: ETableFilterType.search },
                    sorter: true,
                  },
                },
                {
                  title: 'routes.admin.Code.Name',
                  name: 'name',
                  tableItem: {
                    filter: { type: ETableFilterType.search },
                    sorter: true,
                  },
                },
                {
                  title: 'Created',
                  name: 'createdAt',
                  tableItem: {
                    width: 120,
                    filter: { type: ETableFilterType.date },
                    sorter: true,
                    render: (text) => dayjs(text).format(formatDate),
                  },
                },
              ]}
            />
          </div>
        )}
      >
        <input
          ref={input}
          disabled={disabled}
          type="text"
          placeholder={placeholder}
          className={classNames('w-full h-10 text-gray-600 bg-white px-4 ant-input border rounded-xl', {
            'bg-zinc-100 border-none focus:shadow-none text-zinc-400': disabled,
          })}
          onBlur={onBlur}
          onFocus={onFocus}
          onChange={(e) => table.current?.onChange({fullTextSearch: e.target.value, page: 1, perPage: 10})}
        />
      </Dropdown>
      <span
        className="arrow-down absolute top-3 right-2.5 text-gray-400 opacity-100 duration-150 ease-in-out transition-all"><svg
        viewBox="64 64 896 896" focusable="false" data-icon="down" width="1em" height="1em" fill="currentColor"
        aria-hidden="true"><path
        d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path></svg></span>
      <span
        className="search absolute top-3 right-3 text-gray-400 opacity-0 duration-150 ease-in-out transition-all"><svg
        viewBox="64 64 896 896" focusable="false" fill="currentColor" width="1em" height="1em" data-icon="search"
        aria-hidden="true"><path
        d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path></svg></span>
    </div>
  );
};
export default Component;
