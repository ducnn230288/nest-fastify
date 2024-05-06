import React, { forwardRef, Fragment, Ref, useEffect, useImperativeHandle, useRef } from 'react';
import classNames from 'classnames';
import { FormInstance } from 'antd';
import { TableItemFilterList } from '@models';
import { Button } from '@core/button';

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
      list,
      autoFocus = false,
    }: Type,
    ref: Ref<{ input: HTMLInputElement }>,
  ) => {
    useImperativeHandle(ref, () => ({
      input: input.current!,
    }));
    const input = useRef<HTMLInputElement>(null);

    useEffect(() => {
      setTimeout(() => !!mask && !!input.current && Inputmask(mask).mask(input.current));
    }, []);

    const getCursorPosition = (el: HTMLInputElement) => {
      if (!el) return 0;
      if ('selectionStart' in el) {
        return el.selectionStart ?? 0;
      }
      // if (el && document.selection) {
      //   el.focus();
      //   const sel = document.selection.createRange();
      //   const selLen = document.selection.createRange().text.length;
      //   sel.moveStart('character', -el.value.length);
      //   return sel.text.length - selLen;
      // }
      return 0;
    };

    const setCaretPosition = (input: HTMLInputElement, selectionStart: number, selectionEnd: number) => {
      if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
      }
      // else if (input.createTextRange) {
      //   const range = input.createTextRange();
      //   range.collapse(true);
      //   range.moveEnd('character', selectionEnd);
      //   range.moveStart('character', selectionStart);
      //   range.select();
      // }
    };

    return (
      <Fragment>
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
            autoFocus={autoFocus}
            readOnly={disabled}
            defaultValue={value}
            maxLength={maxLength}
            placeholder={placeholder}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            onKeyUp={(e) => e.keyCode === 13 && onPressEnter && onPressEnter(e)}
          />
          {!!addonAfter && <div>{addonAfter(form)}</div>}
        </div>
        {list && (
          <div className={'flex flex-wrap gap-2 mt-2'}>
            {list.map((item, index) => (
              <Button
                key={index}
                text={item.label}
                onClick={() => {
                  if (item.value) {
                    const value = input.current?.value ?? '';
                    const position = getCursorPosition(input.current!);
                    input.current!.value = value.slice(0, position) + item.value + value.slice(position);
                    onChange && onChange({ target: input.current });
                    setCaretPosition(
                      input.current!,
                      position + item.value.toString().length,
                      position + item.value.toString().length,
                    );
                  }
                }}
              />
            ))}
          </div>
        )}
      </Fragment>
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
  list?: TableItemFilterList[];
  autoFocus?: boolean;
};
export default Component;
