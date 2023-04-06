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
import { SEND_CODE_MSG } from '../../graphql/auth';

export default () => {

  const [run] = useMutation(SEND_CODE_MSG);

  return (
    <ProConfigProvider hashed={false}>
      <div className={styles.container}>
        <LoginForm
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
                name="mobile"
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
                phoneName="mobile"
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码！',
                  },
                ]}
                onGetCaptcha={async (tel: string) => {
                  console.log('tel:', tel);
                  run({
                    variables: {
                      tel,                    }
                  })
                  message.success('获取验证码成功！验证码为：1234');
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