import { LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RequestConfig, RunTimeLayoutConfig } from '@umijs/max';
import { history, Link, useLocation } from '@umijs/max';
import { App } from 'antd';
import React, { useEffect } from 'react';
import {
  AvatarDropdown,
  AvatarName,
  Footer,
  Question,
  SelectLang,
} from '@/components';
import { AUTH_MESSAGE_KEY, AUTH_MESSAGE_TYPE_KEY } from '@/constants/auth';
import { currentUser as queryCurrentUser } from '@/services/ant-design-pro/api';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
import '@ant-design/v5-patch-for-react-19';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
const noAuthRoutes = [loginPath, '/user/register', '/user/register-result'];

const LoginSuccessMessage: React.FC = () => {
  const location = useLocation();
  const { message } = App.useApp();

  useEffect(() => {
    const authMessage = sessionStorage.getItem(AUTH_MESSAGE_KEY);
    if (!authMessage) {
      return;
    }
    const authMessageType = sessionStorage.getItem(AUTH_MESSAGE_TYPE_KEY) || 'success';
    sessionStorage.removeItem(AUTH_MESSAGE_KEY);
    sessionStorage.removeItem(AUTH_MESSAGE_TYPE_KEY);
    if (authMessageType === 'error') {
      message.error(authMessage);
      return;
    }
    message.success(authMessage);
  }, [location.pathname, message]);

  return null;
};

const normalizeCurrentUser = (
  user?: API.CurrentUser,
): API.CurrentUser | undefined => {
  if (!user) {
    return undefined;
  }
  return {
    ...user,
    name: user.name ?? user.username ?? user.account,
    userid:
      user.userid ?? (typeof user.id !== 'undefined' ? String(user.id) : undefined),
    access: user.access ?? (user.userRole === 1 ? 'admin' : 'user'),
  };
};

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser({
        skipErrorHandler: true,
      });
      return normalizeCurrentUser(msg.data);
    } catch (_error) {
      history.push(loginPath);
    }
    return undefined;
  };

  const { location } = history;
  if (!noAuthRoutes.includes(location.pathname)) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

export const layout: RunTimeLayoutConfig = ({
  initialState,
  setInitialState,
}) => {
  return {
    actionsRender: () => [
      <Question key="doc" />,
      <SelectLang key="SelectLang" />,
    ],
    avatarProps: {
      src: initialState?.currentUser?.avatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      if (
        !initialState?.currentUser &&
        !noAuthRoutes.includes(location.pathname)
      ) {
        history.push(loginPath);
      }
    },
    bgLayoutImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    childrenRender: (children) => {
      return (
        <>
          <LoginSuccessMessage />
          {children}
          {isDev && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

export const request: RequestConfig = {
  timeout: 100000,
  ...errorConfig,
};
