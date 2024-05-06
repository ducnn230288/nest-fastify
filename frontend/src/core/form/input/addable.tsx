// @ts-nocheck
import React, { Fragment, useState } from 'react';
import { Form, Checkbox, FormInstance } from 'antd';
import classNames from 'classnames';

import { FormModel } from '@models';
import { Button } from '../../button';
import { Trash, Plus } from '@svgs';

const Component = ({
  name,
  column = [],
  textAdd = 'Thêm dòng',
  onAdd = () => null,
  generateForm,
  form,
  isTable = true,
  showRemove = () => true,
  idCheck,
}: Type) => {
  const [_temp, set_temp] = useState({ indeterminate: false, checkAll: false, checkedList: [] });
  const onCheckAllChange = (e: any) => {
    const array = form.getFieldValue(name).map((item: any) => {
      item[idCheck + 'Checked'] = e.target.checked;
      return item;
    });
    set_temp({
      indeterminate: false,
      checkAll: e.target.checked,
      checkedList: e.target.checked ? array.map((item: any) => item[idCheck]) : [],
    });

    form.setFieldValue(name, array);
  };
  const onCheckChange = (e: any, array: [], index: number) => {
    if (e.target.checked) {
      _temp.checkedList.push(array[index][idCheck]);
      set_temp({
        indeterminate: array.length !== _temp.checkedList.length,
        checkAll: array.length === _temp.checkedList.length,
        checkedList: _temp.checkedList,
      });
    } else {
      _temp.checkedList.splice(_temp.checkedList.indexOf(array[index][idCheck]), 1);
      set_temp({ indeterminate: _temp.checkedList.length !== 0, checkAll: false, checkedList: _temp.checkedList });
    }
    array[index][idCheck + 'Checked'] = e.target.checked;
    if (form.setFieldValue) {
      form.setFieldValue(name, array);
    }
  };
  return (
    <Form.List name={name}>
      {(fields, { add, remove }) =>
        isTable ? (
          <Fragment>
            <div className={'table w-full border-collapse addable'} style={{ minWidth: column.length * 150 }}>
              <div className="table-row">
                {!!idCheck && (
                  <div className={'table-cell font-bold p-1 text-center w-10'}>
                    <Checkbox
                      indeterminate={_temp.indeterminate}
                      onChange={onCheckAllChange}
                      checked={_temp.checkAll}
                    />
                  </div>
                )}
                <div className={'table-cell border bg-gray-300 font-bold p-1 text-center w-10'}>STT</div>
                {column.map((col: any, index: number) => (
                  <div
                    key={index}
                    className={classNames('table-cell border bg-gray-300 font-bold p-1 text-center', {
                      'w-full': column.length === 1,
                      'w-1/2': column.length === 2,
                      'w-1/3': column.length === 3,
                      'w-1/4': column.length === 4,
                      'w-1/5': column.length === 5,
                      'w-1/6': column.length === 6,
                    })}
                  >
                    {col.title}
                  </div>
                ))}
                <div className={'w-8 h-1'} />
              </div>
              {fields.map(({ name: n }, i) => (
                <div className="table-row" key={i}>
                  {!!idCheck && (
                    <div className={'table-cell text-center'}>
                      <Checkbox
                        onChange={(e) => onCheckChange(e, form.getFieldValue(name), n)}
                        checked={_temp.checkedList.indexOf(form.getFieldValue(name)[n][idCheck]) > -1}
                      />
                    </div>
                  )}
                  <div className={'table-cell border bg-gray-300 text-center'}>{i + 1}</div>
                  {column.map((col: any, index: number) => (
                    <div className={'table-cell border relative'} key={index}>
                      {generateForm(col, index + '_' + i, false, [n, col.name])}
                    </div>
                  ))}
                  <div className={'table-cell align-middle w-8 sm:w-8'}>
                    {showRemove(form.getFieldValue([[name], n]), n) && (
                      <Trash
                        className="fill-red-600 hover:fill-red-400 cursor-pointer h-8 w-8"
                        onClick={() => {
                          remove(n);
                          onAdd(form.getFieldValue(name), form);
                        }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className={'flex justify-end btn-add'}>
              <Button
                className="addable-add"
                onClick={() => {
                  add();
                  onAdd(form.getFieldValue(name), form);
                }}
                icon={<Plus className="icon-cud !h-5 !w-5" />}
                text={textAdd}
              />
            </div>
          </Fragment>
        ) : (
          <div className={'addable'}>
            {fields.map(({ name: n }, i) => (
              <div className={'grid gap-x-5 grid-cols-12'} key={i}>
                {column.map((col: any, index: number) => (
                  <div
                    className={classNames(
                      col?.formItem?.classItem,
                      'col-span-12' +
                        (' sm:col-span-' +
                          (col?.formItem?.colTablet
                            ? col?.formItem?.colTablet
                            : col?.formItem?.col
                              ? col?.formItem?.col
                              : 12)) +
                        (' lg:col-span-' + (col?.formItem?.col ? col?.formItem?.col : 12)),
                    )}
                    key={index}
                  >
                    {generateForm(col, index + '_' + i, true, [n, col.name])}
                  </div>
                ))}
                <div className={'table-cell align-middle w-8'}>
                  {showRemove(form.getFieldValue([[name], n]), n) && (
                    <Trash
                      className="fill-red-600 hover:fill-red-400 cursor-pointer h-8 w-8"
                      onClick={() => {
                        remove(n);
                        onAdd(form.getFieldValue(name), form);
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
            <div className={'flex justify-end'}>
              <Button
                icon={<Plus className="icon-cud !h-5 !w-5" />}
                text={textAdd}
                className="addable-add"
                onClick={() => {
                  add();
                  onAdd(form.getFieldValue(name), form);
                }}
              />
            </div>
          </div>
        )
      }
    </Form.List>
  );
};
type Type = {
  name?: string;
  column?: FormModel[];
  textAdd?: string;
  onAdd?: (values: any, form: FormInstance) => void;
  generateForm: any;
  form: FormInstance;
  isTable?: boolean;
  showRemove: any;
  idCheck: any;
};
export default Component;
