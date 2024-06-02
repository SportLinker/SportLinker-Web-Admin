import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { imageExporter } from '../../assets/images';
import styles from './Login.module.css'; // Import CSS module file for styling

const LoginPage = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  return (
    <div className={styles.loginPageContainer}>
      <div className={styles.leftSide}>
        <div className={styles.loginHeader}>
          <h1>Sign In</h1>
        </div>
        <div className={styles.loginForm}>
          <Form name="basic" onFinish={onFinish} className={styles.formContainer}>
            <Form.Item
              className={styles.formItem}
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <label className={styles.label}>Email</label>
              <Input className={styles.inputField} placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              className={styles.formItem}
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <label className={styles.label}>Password</label>
              <Input.Password className={styles.inputField} placeholder="Enter your password" />
            </Form.Item>

            <div className={styles.formItemsContainer}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className={styles.rememberCheckbox}>Remember password?</Checkbox>
              </Form.Item>

              <Form.Item noStyle>
                <a href="/signup" className={styles.forgotPassword}>
                  Forgot password?
                </a>
              </Form.Item>
            </div>

            <Form.Item>
              <Button type="primary" htmlType="submit" className={styles.loginButton}>
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className={styles.rightSide}>
        <img
          style={{
            width: '100%',
            maxHeight: '100%',
            objectPosition: 'center',
            objectFit: 'fill',
          }}
          src={imageExporter.background}
          alt="background"
        ></img>
      </div>
    </div>
  );
};

export default LoginPage;
