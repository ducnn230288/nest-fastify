import React, { useEffect, useRef } from 'react';
import { API, keyToken, uuidv4 } from '@utils';

const Component = ({
  onChange,
  value = '',
  placeholder,
}: {
  onChange?: (values: string) => void;
  value?: string;
  placeholder: string;
  disabled: boolean;
}) => {
  const _id = useRef(uuidv4());
  useEffect(() => {
    setTimeout(() => {
      const editor = SUNEDITOR.create(document.getElementById(_id.current), {
        value,
        placeholder,
        width: 'auto',
        height: 'auto',
        fontSize: [11, 13, 16, 18, 20, 24, 30, 36, 48, 60, 72, 96, 128],
        buttonList: [
          ['undo', 'redo'],
          ['font', 'fontSize', 'formatBlock'],
          ['paragraphStyle', 'blockquote'],
          ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
          ['fontColor', 'hiliteColor', 'textStyle'],
          ['removeFormat'],
          // '/', // Line break
          ['outdent', 'indent'],
          ['align', 'horizontalRule', 'list', 'lineHeight'],
          ['table', 'link', 'image', 'video', 'audio' /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
          /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
          ['fullScreen', 'showBlocks', 'codeView'],
          // ['preview', 'print'],
          // ['save', 'template'],
          /** ['dir', 'dir_ltr', 'dir_rtl'] */ // "dir": Toggle text direction, "dir_ltr": Right to Left, "dir_rtl": Left to Right
        ],
      });
      editor.onChange = onChange;
      editor.onImageUploadBefore = (files: any, info: any, uploadHandler: any) => {
        const bodyFormData = new FormData();
        bodyFormData.append('file', files[0]);
        API.responsible(
          `/file`,
          {},
          {
            ...API.init(),
            method: 'post',
            body: bodyFormData,
            headers: {
              authorization: 'Bearer ' + (localStorage.getItem(keyToken) || ''),
              'Accept-Language': localStorage.getItem('i18nextLng') || '',
            },
          },
        ).then(({ data }: any) => {
          uploadHandler({
            result: [
              {
                url: data.url,
                name: files[0].name,
                size: files[0].size,
              },
            ],
          });
        });
        return false;
      };
    });
  }, []);
  return <div id={_id.current} />;
};
export default Component;
