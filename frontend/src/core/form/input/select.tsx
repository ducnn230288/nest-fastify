import React, { useEffect, useState } from 'react';
import { FormInstance, Select } from 'antd';

import { TableGet, TableItemFilterList } from '@models';
import { arrayUnique, cleanObjectKeyNull } from '@utils';

const Component = ({
  form,
  value,
  showSearch = true,
  maxTagCount,
  onChange,
  onBlur,
  placeholder,
  disabled,
  get,
  list,
  mode,
  firstLoad,
  ...prop
}: Type) => {
  const [_list, set_list] = useState(list ? list : []);
  const facade = get?.facade() || {};
  let __list = !get
    ? _list
    : facade[get?.key || 'result']
        ?.map((e: any) => (get.format ? get.format(e) : e))
        .filter((item: any) => !!item.value);
  const loadData = async (fullTextSearch: string) => {
    if (get) {
      const { time, queryParams } = facade;
      const params = cleanObjectKeyNull(
        get.params ? get.params(fullTextSearch, form?.getFieldValue) : { fullTextSearch },
      );
      if (!facade[get.key || 'result'] || new Date().getTime() > time || JSON.stringify(params) != queryParams)
        facade[get.method || 'get'](params);
    } else if (list) {
      set_list(
        list.filter(
          (item: any) =>
            !item?.label?.toUpperCase || item?.label?.toUpperCase().indexOf(fullTextSearch.toUpperCase()) > -1,
        ),
      );
    }
  };
  useEffect(() => {
    if (firstLoad) {
      facade[get?.method || 'get'](firstLoad(value));
    }
  }, []);

  const [_temp, set_temp] = useState([]);
  useEffect(() => {
    if (get?.data) {
      let data = get.data();
      if (get?.format && data) {
        if (mode === 'multiple') data = data.map(get.format);
        else data = [get.format(data)];
        if (JSON.stringify(data) !== JSON.stringify(_temp)) set_temp(data);
      }
    }
  }, [get?.data]);
  if (_temp) __list = __list?.length ? arrayUnique([..._temp, ...__list], 'value') : _temp;

  return (
    <Select
      maxTagCount={maxTagCount}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      listHeight={200}
      filterOption={false}
      showSearch={true}
      loading={facade?.isLoading || false}
      allowClear
      onSearch={showSearch ? (value) => loadData(value) : undefined}
      value={value}
      maxTagPlaceholder={(array) => '+' + array.length}
      mode={mode}
      optionFilterProp="label"
      onBlur={onBlur}
      // onSelect={(value) => formItem?.onSelect && formItem?.onSelect(value, form)}
      onDropdownVisibleChange={(open) => open && !!facade?.isLoading && loadData('')}
      {...prop}
    >
      {__list?.map((item: any, index: number) => (
        <Select.Option key={`${item.value}${index}`} value={item.value} disabled={item.disabled}>
          <span dangerouslySetInnerHTML={{ __html: item.label }} />
        </Select.Option>
      ))}
    </Select>
  );
};
type Type = {
  form?: FormInstance;
  value?: any;
  showSearch?: boolean;
  maxTagCount?: number | 'responsive';
  onChange: (e: any) => any;
  onBlur?: (e: any) => any;
  placeholder?: string;
  disabled?: boolean;
  get?: TableGet;
  list?: TableItemFilterList[];
  mode?: 'multiple' | 'tags';
  firstLoad?: (data: any) => any;
};
export default Component;
