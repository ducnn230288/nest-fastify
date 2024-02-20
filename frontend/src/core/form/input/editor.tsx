import React from 'react';
import SunEditor from 'suneditor-react';

const Component = ({
  onChange,
  value = '',
  placeholder,
  disabled,
}: {
  onChange?: (values: string) => void;
  value?: string;
  placeholder: string;
  disabled: boolean;
}) => {

  return (
    <SunEditor setContents={value} onChange={onChange} placeholder={placeholder} disable={disabled} />
  );
};
export default Component;
