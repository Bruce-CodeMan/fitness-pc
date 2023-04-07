/*
 * @Date: 2023-04-06 14:27:08
 * @Author: Bruce
 * @Description: 
 */
import {
  LockOutlined,
  MobileOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
  ProConfigProvider,
} from '@ant-design/pro-components';
import { message, Tabs } from 'antd';
import styles from './index.module.less';
import { useMutation } from '@apollo/client';
import { SEND_CODE_MSG, LOGIN } from '../../graphql/auth';
import { AUTH_TOKEN } from '../../utils/constant';
import { useNavigate } from 'react-router-dom';

interface IValue {
  tel: string;
  code: string;
  autoLogin: boolean;
}

export default () => {

  const [run] = useMutation(SEND_CODE_MSG);
  const [login] = useMutation(LOGIN);
  const nav = useNavigate();

  const loginHandler = async(values: IValue) => {
    const res = await login({
      variables: values
    });
    if(res.data.login.code===200) {
      // 自动登录
      if(values.autoLogin){
        localStorage.setItem(AUTH_TOKEN, res.data.login.data);
      }
      message.success(res.data.login.message);
      nav('/');
      return
    }
    message.error(res.data.login.message);
  }

  return (
    <ProConfigProvider hashed={false}>
      <div className={styles.container}>
        <LoginForm
          onFinish={loginHandler}
          logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
          title="Github"
          subTitle="全球最大的代码托管平台"
        >
          <Tabs>
            <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
          </Tabs>
          
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined className={'prefixIcon'} />,
                }}
                name="tel"
                placeholder={'手机号'}
                rules={[
                  {
                    required: true,
                    message: '请输入手机号！',
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: '手机号格式错误！',
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={'请输入验证码'}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${'获取验证码'}`;
                  }
                  return '获取验证码';
                }}
                phoneName="tel"
                name="code"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码！',
                  },
                ]}
                onGetCaptcha={async (tel: string) => {
                  const res = await run({
                    variables: {
                      tel,                   
                    }
                  });
                  if(res.data.sendCodeMsg.code === 200){
                    message.success(res.data.sendCodeMsg.message);
                  }else{
                    message.error(res.data.sendCodeMsg.message);
                  }
                  
                }}
              />
          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码
            </a>
          </div>
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};