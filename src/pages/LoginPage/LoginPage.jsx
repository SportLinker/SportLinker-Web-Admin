import React from 'react';
import {Form, Input, Button, Checkbox} from 'antd';
import {imageExporter} from '../../assets/images';
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
					<Form
						name="basic"
						initialValues={{remember: true}}
						onFinish={onFinish}
						className={styles.formContainer}
					>
						<Form.Item
							className={styles.formItem}
							label="Email"
							name="email"
							rules={[{required: true, message: 'Please input your email!'}]}
						>
							<Input className={`${styles.inputField} ${styles.inputField1}`} />
						</Form.Item>

						<Form.Item
							className={styles.formItem}
							label="Password"
							name="password"
							rules={[{required: true, message: 'Please input your password!'}]}
						>
							<Input.Password className={styles.inputField} />
						</Form.Item>

						<div className={styles.formItemsContainer}>
							<Form.Item name="remember" valuePropName="checked">
								<Checkbox className={styles.rememberCheckbox}>
									Remember password?
								</Checkbox>
							</Form.Item>

							<Form.Item>
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
						objectFit: 'cover',
					}}
					src={imageExporter.background}
					alt="background"
				></img>
			</div>
		</div>
	);
};

export default LoginPage;
