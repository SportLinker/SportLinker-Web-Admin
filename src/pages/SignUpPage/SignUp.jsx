import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { imageExporter } from '../../assets/images';
import styles from './SignUp.module.css'; // Import CSS module file for styling

const SignUpPage = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  return (
    <div className={styles.signUpPageContainer}>
      <div className={styles.leftSide}>
        <img
          style={{
            width: '100%',
            maxHeight: '100%',
            objectPosition: 'center',
            objectFit: 'cover',
          }}
          src={imageExporter.background}
          alt="background"
        />
      </div>
      <div className={styles.rightSide}>
        <div className={styles.signUpHeader}>
          <h1>Sign Up</h1>
        </div>
        <div className={styles.signUpForm}>
          <Form name="basic" onFinish={onFinish} className={styles.formContainer}>
            <Form.Item
              className={styles.formItem}
              name="firstName"
              rules={[{ required: true, message: 'Please input your first name!' }]}
            >
              <label className={styles.label}>First Name</label>
              <Input className={styles.inputField} placeholder="Enter your first name" />
            </Form.Item>

            <Form.Item
              className={styles.formItem}
              name="lastName"
              rules={[{ required: true, message: 'Please input your last name!' }]}
            >
              <label className={styles.label}>Last Name</label>
              <Input className={styles.inputField} placeholder="Enter your last name" />
            </Form.Item>

            <Form.Item
              className={styles.formItem}
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                  type: 'email',
                },
              ]}
            >
              <label className={styles.label}>Email</label>
              <Input className={styles.inputField} placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              className={styles.formItem}
              name="phoneNo"
              rules={[
                {
                  required: true,
                  message: 'Please input your phone number!',
                },
                {
                  pattern: /^0\d{9}$/,
                  message: 'Phone number must start with 0 and be 10 digits long!',
                },
              ]}
            >
              <label className={styles.label}>Phone No</label>
              <Input className={styles.inputField} placeholder="Enter your phone number" />
            </Form.Item>

            <Form.Item
              className={styles.formItem}
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <label className={styles.label}>Password</label>
              <Input.Password className={styles.inputField} placeholder="Enter your password" />
            </Form.Item>

            <Form.Item
              className={styles.formItem}
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match!'));
                  },
                }),
              ]}
            >
              <label className={styles.label}>Confirm Password</label>
              <Input.Password className={styles.inputField} placeholder="Confirm your password" />
            </Form.Item>

            <Form.Item
              name="agree"
              valuePropName="checked"
              rules={[
                {
                  validator(_, value) {
                    if (value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Please agree to the terms of use!'));
                  },
                },
              ]}
            >
              <Checkbox className={styles.rememberCheckbox}>I agree with the terms of use</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className={styles.signUpButton}>
                Sign Up
              </Button>
            </Form.Item>
          </Form>
          <p className={styles.signInLink}>
            Already have an account? <a href="/login">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
