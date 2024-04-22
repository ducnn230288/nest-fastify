/* eslint-disable @typescript-eslint/no-unused-vars */
declare module '*.svg' {
  import * as echarts from 'echarts';
  import * as GLightbox from 'glightbox';
  import * as React from 'react';
  const ReactComponent: React.FunctionComponent<React.ComponentProps<'svg'> & { title?: string }>;

  export default ReactComponent;
}

/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_URL_SOCKET: string;
  readonly VITE_URL_API: string;
  readonly VITE_URL_LANGUAGES: string;
  readonly VITE_URL_LANGUAGE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const GLightbox: GLightbox;
declare const echarts: echarts;
declare const Swal: any;
declare const SUNEDITOR: any;
