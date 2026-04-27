// @ts-ignore
/* eslint-disable */

declare namespace API {
  type BaseResponse<T = any> = {
    code?: number;
    msg?: string;
    data?: T;
    description?: string;
  };

  type CurrentUser = {
    id?: number | string;
    username?: string;
    account?: string;
    planetCode?: string;
    email?: string;
    avatar?: string;
    gender?: number | string;
    createTime?: string;
    updateTime?: string;
    userRole?: number;
    status?: number;
    name?: string;
    userid?: string;
    access?: string;
  };

  type UserListItem = {
    id?: number;
    username?: string;
    planetCode?: string;
    email?: string;
    phone?: number;
    avatarUrl?: string;
    gender?: number;
    userRole?: number;
    status?: number;
    createTime?: string;
    updateTime?: string;
    account?: string;
  };

  type LoginResult = BaseResponse<Record<string, any> | null>;

  type RegisterResult = BaseResponse<Record<string, any> | null>;

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    account?: string;
    password?: string;
    planetCode?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type RegisterParams = {
    account?: string;
    password?: string;
    checkPassword?: string;
    type?: string;
  };

  type ErrorResponse = {
    errorCode: string;
    errorMessage?: string;
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
