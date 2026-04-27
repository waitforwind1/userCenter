import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { message } from 'antd';

interface ResponseStructure {
  code?: number;
  msg?: string;
  data?: any;
  description?: string;
}

const isSuccessCode = (code?: number) =>
  typeof code === 'undefined' || code === 0 || code === 200;

export const errorConfig: RequestConfig = {
  errorConfig: {
    errorThrower: (res) => {
      const { code, msg, data, description } = res as unknown as ResponseStructure;
      if (!isSuccessCode(code)) {
        const error: any = new Error(description || msg || 'Request failed');
        error.name = 'BizError';
        error.info = { code, msg, data, description };
        throw error;
      }
    },
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      if (error.name === 'BizError') {
        message.error(error.info?.description || error.info?.msg || 'Request failed');
      } else if (error.response) {
        message.error(`Response status:${error.response.status}`);
      } else if (error.request) {
        message.error('None response! Please retry.');
      } else {
        message.error('Request error, please retry.');
      }
    },
  },
  requestInterceptors: [
    (config: RequestOptions) => {
      return config;
    },
  ],
  responseInterceptors: [
    (response) => {
      return response;
    },
  ],
};
