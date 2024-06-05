import React from 'react';
import {Form, Input, Button, Checkbox} from 'antd';
import styles from './SignUp.module.css';
import {imageExporter} from '../../assets/images';
import {Helmet} from 'react-helmet';

const SignUpPage = () => {
	const onFinish = (values) => {
		console.log('Received values:', values);
	};

	return (
		<>
			<Helmet>
				<title>Sign Up - SportLinker</title>
			</Helmet>
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
						<Form layout="vertical" name="basic" onFinish={onFinish}>
							<Form.Item
								label="First Name"
								name="firstName"
								rules={[{required: true, message: 'Please input your first name!'}]}
							>
								<Input className={styles.inputForm} />
							</Form.Item>

							<Form.Item
								label="Last Name"
								name="lastName"
								rules={[{required: true, message: 'Please input your last name!'}]}
							>
								<Input className={styles.inputForm} />
							</Form.Item>

							<Form.Item
								label="Email"
								name="email"
								rules={[
									{
										required: true,
										message: 'Please input your email!',
										type: 'email',
									},
								]}
							>
								<Input className={styles.inputForm} />
							</Form.Item>

							<Form.Item
								label="Phone No"
								name="phoneNo"
								rules={[
									{
										required: true,
										message: 'Please input your phone number!',
									},
									{
										pattern: /^0\d{9}$/,
										message:
											'Phone number must start with 0 and be 10 digits long!',
									},
								]}
							>
								<Input className={styles.inputForm} />
							</Form.Item>

							<Form.Item
								label="Password"
								name="password"
								rules={[{required: true, message: 'Please input your password!'}]}
							>
								<Input.Password className={styles.inputForm} />
							</Form.Item>

							<Form.Item
								label="Confirm Password"
								name="confirmPassword"
								dependencies={['password']}
								rules={[
									{required: true, message: 'Please confirm your password!'},
									({getFieldValue}) => ({
										validator(_, value) {
											if (!value || getFieldValue('password') === value) {
												return Promise.resolve();
											}
											return Promise.reject(
												new Error('The two passwords do not match!')
											);
										},
									}),
								]}
							>
								<Input.Password className={styles.inputForm} />
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
											return Promise.reject(
												new Error('Please agree to the terms of use!')
											);
										},
									},
								]}
							>
								<Checkbox>I agree with the terms of use</Checkbox>
							</Form.Item>

							<Form.Item>
								<Button
									type="primary"
									htmlType="submit"
									className={styles.signUpButton}
								>
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
		</>
	);
};

export default SignUpPage;
