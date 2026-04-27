import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { Link, SelectLang, history } from '@umijs/max';
import { App } from 'antd';
import { createStyles } from 'antd-style';
import React from 'react';
import { Footer } from '@/components';
import { AUTH_MESSAGE_KEY, AUTH_MESSAGE_TYPE_KEY } from '@/constants/auth';
import { register } from '@/services/ant-design-pro/api';

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

const RegisterPage: React.FC = () => {
  const { styles } = useStyles();
  const { message } = App.useApp();

  const handleSubmit = async (values: API.RegisterParams) => {
    try {
      const msg = await register(
        { ...values, type: 'account' },
        { skipErrorHandler: true },
      );
      if (msg.code === 0 || msg.code === 200) {
        sessionStorage.setItem(
          AUTH_MESSAGE_KEY,
          msg.description || 'Register successful, please sign in',
        );
        sessionStorage.setItem(AUTH_MESSAGE_TYPE_KEY, 'success');
        history.push('/user/login');
        return;
      }
      message.error(
        msg.description || msg.msg || 'Register failed, please try again',
      );
    } catch (error:any) {
      console.log(error);
      message.error(
        error?.info?.description ||
          error?.info?.msg ||
          'Register failed, please try again',
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
          title="Create Account"
          subTitle="Register first, then return to login"
          submitter={{ searchConfig: { submitText: 'Register' } }}
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
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
              { required: true, message: 'Please enter password' },
              {
                min: 6,
                type: 'string',
                message: 'Password must be at least 6 characters',
              },
            ]}
          />
          <ProFormText.Password
            name="checkPassword"
            fieldProps={{ size: 'large', prefix: <LockOutlined /> }}
            rules={[
              { required: true, message: 'Please confirm password' },
              {
                min: 6,
                type: 'string',
                message: 'Password must be at least 6 characters',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match'));
                },
              }),
            ]}
          />
          <ProFormText
            name="planetCode"
            width="xs"
            fieldProps={{ size: 'small' }}
            placeholder="Planet ID"
            rules={[{ required: true, message: 'Please enter Planet ID' }]}
          />
          <div style={{ marginBottom: 24, textAlign: 'right' }}>
            <Link to="/user/login">Back to login</Link>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterPage;
