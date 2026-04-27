import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { history, Link, SelectLang, useModel } from '@umijs/max';
import { App } from 'antd';
import { createStyles } from 'antd-style';
import React from 'react';
import { flushSync } from 'react-dom';
import { Footer } from '@/components';
import { AUTH_MESSAGE_KEY, AUTH_MESSAGE_TYPE_KEY } from '@/constants/auth';
import { login } from '@/services/ant-design-pro/api';

const useStyles = createStyles(({ token }) => ({
  lang: {
    width: 42,
    height: 42,
    lineHeight: '42px',
    position: 'fixed',
    right: 16,
    borderRadius: token.borderRadius,
    ':hover': {
      backgroundColor: token.colorBgTextHover,
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'auto',
    backgroundImage:
      "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
    backgroundSize: '100% 100%',
  },
}));

const LoginPage: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { styles } = useStyles();
  const { message } = App.useApp();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      const msg = await login(
        { ...values, type: 'account' },
        { skipErrorHandler: true },
      );
      if (msg.code === 0 || msg.code === 200) {
        sessionStorage.setItem(
          AUTH_MESSAGE_KEY,
          msg.description || 'Login successful',
        );
        sessionStorage.setItem(AUTH_MESSAGE_TYPE_KEY, 'success');
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }
      message.error(
        msg.description || msg.msg || 'Login failed, please try again',
      );
    } catch (error:any) {
      console.log(error);
      message.error(
        error?.info?.description ||
          error?.info?.msg ||
          'Login failed, please try again',
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div style={{ flex: 1, padding: '32px 0' }}>
        <LoginForm
          contentStyle={{ minWidth: 280, maxWidth: '75vw' }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="User Management"
          subTitle="Sign in with your account"
          initialValues={{ autoLogin: true }}
          submitter={{ searchConfig: { submitText: 'Login' } }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <ProFormText
            name="account"
            fieldProps={{ size: 'large', prefix: <UserOutlined /> }}
            rules={[{ required: true, message: 'Please enter account' }]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{ size: 'large', prefix: <LockOutlined /> }}
            rules={[
              {
                min: 6,
                type: 'string',
                message: 'Password must be at least 6 characters',
              },
              { required: true, message: 'Please enter password' },
            ]}
          />
          <div style={{ marginBottom: 24 }}>
            <ProFormCheckbox noStyle name="autoLogin">
              Remember me
            </ProFormCheckbox>
            <Link to="/user/register" style={{ float: 'right' }}>
              Create account
            </Link>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
