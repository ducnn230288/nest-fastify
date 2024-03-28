import React, { forwardRef, Ref, useEffect, useImperativeHandle, useRef } from 'react';
import classNames from 'classnames';
import { FormInstance } from 'antd';

const Component = forwardRef(
  (
    {
      id,
      className = 'h-10',
      mask,
      value,
      addonBefore,
      addonAfter,
      form,
      disabled,
      maxLength,
      placeholder,
      onBlur,
      onFocus,
      onChange,
      onPressEnter,
      ...prop
    }: Type,
    ref: Ref<{ input: HTMLInputElement }>,
  ) => {
    useImperativeHandle(ref, () => ({
      input: input.current!,
    }));
    const input = useRef<HTMLInputElement>(null);

    useEffect(() => {
      setTimeout(() => {
        if (mask && input.current) {
          // @ts-ignore
          import('inputmask').then(({ default: Inputmask }) => Inputmask(mask).mask(input.current));
        }
      });
    }, []);
    return (
      <div
        className={classNames('', { 'ant-input flex items-center border rounded-xl': !!addonBefore || !!addonAfter })}
      >
        {!!addonBefore && <div>{addonBefore(form)}</div>}
        <input
          id={id}
          ref={input}
          className={classNames(
            'w-full text-gray-600 bg-white px-4',
            {
              'ant-input': !addonBefore && !addonAfter,
              'border rounded-xl': !addonBefore && !addonAfter,
              'rounded-l-xl border-r': !addonBefore && !!addonAfter,
              'rounded-r-xl border-l': !!addonBefore && !addonAfter,
              'border-r border-l': !!addonBefore && !!addonAfter,
              'bg-zinc-100 border-none focus:shadow-none text-zinc-400': disabled,
            },
            className,
          )}
          readOnly={disabled}
          defaultValue={value}
          maxLength={maxLength}
          placeholder={placeholder}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          onKeyUp={(e) => e.keyCode === 13 && onPressEnter && onPressEnter(e)}
          {...prop}
        />
        {!!addonAfter && <div>{addonAfter(form)}</div>}
      </div>
    );
  },
);
Component.displayName = 'Mask Input';
type Type = {
  id?: string;
  className?: string;
  mask?: any;
  value?: string;
  addonBefore?: (form?: FormInstance) => JSX.Element;
  addonAfter?: (form?: FormInstance) => JSX.Element;
  form?: FormInstance;
  disabled?: boolean;
  maxLength?: number;
  placeholder: string;
  onBlur?: (e: any) => any;
  onFocus?: (e: any) => any;
  onChange?: (e: any) => any;
  onPressEnter?: (e: any) => any;
};
export default Component;
