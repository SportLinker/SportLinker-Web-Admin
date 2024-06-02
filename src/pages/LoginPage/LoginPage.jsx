import React, {useState} from 'react';
import {Form, Input, Button, Checkbox, message} from 'antd';
import {imageExporter} from '../../assets/images';
import styles from './Login.module.css'; // Import CSS module file for styling
import {Helmet} from 'react-helmet';
import {useDispatch, useSelector} from 'react-redux';
import {handleLogin} from '../../redux/slices/userLoginSlice';
import {useNavigate} from 'react-router-dom';
import {getUserLoginSelector} from '../../redux/selectors';

const LoginPage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// const user = useSelector(getUserLoginSelector);
	// console.log('user', user);

	const onFinish = (values) => {
		console.log('Received values:', values);
		setIsLoading(true);

		// Clear any previous user data in local storage
		// localStorage.removeItem('user');

		dispatch(handleLogin(values))
			.then((response) => {
				const user = response.payload.metadata.user;
				if (user?.role === 'admin') {
					setIsLoading(false);
					navigate('/');
					message.success('Login successful!');
				} else {
					setIsLoading(false);
					message.error('You do not have permission to access this page!');
				}
			})
			.catch((error) => {
				setIsLoading(false);
				console.log(error);
				message.error('Incorect email or password!');
			});
	};

	return (
		<>
			<Helmet>
				<title>Sign In - SportLinker</title>
			</Helmet>
			<div className={styles.loginPageContainer}>
				<div className={styles.leftSide}>
					<div className={styles.loginHeader}>
						<h1>Sign In</h1>
					</div>
					<div className={styles.loginForm}>
						<Form name="basic" onFinish={onFinish} className={styles.formContainer}>
							<Form.Item
								className={styles.formItem}
								label="Phone"
								name="phone"
								rules={[
									{required: true, message: 'Please input your phone!'},
									{
										pattern: /^0\d{9}$/,
										message:
											'Phone number must start with 0 and be exactly 10 digits!',
									},
								]}
							>
								<Input
									className={`${styles.inputField} ${styles.inputField1}`}
									type="tel"
									maxLength={10}
								/>
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
								<Form.Item name="remember">
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
								<Button
									loading={isLoading}
									type="primary"
									htmlType="submit"
									className={styles.loginButton}
								>
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
		</>
	);
};

export default LoginPage;
