import {DeleteFilled, EditFilled} from '@ant-design/icons';
import {Button, DatePicker, Form, Input, Modal, Select, Table, Tag, Tooltip} from 'antd';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {getAllUserSelector} from '../../redux/selectors';
import {fetchUsers, createUser, updateUser, deleteUser} from '../../redux/slices/userSlice';
import styles from './UserPage.module.css';
import {Helmet} from 'react-helmet';

const {Column} = Table;
const {Item} = Form;
const {Option} = Select;

// Define enum for user gender
const UserGender = {
	men: 'Men',
	women: 'Women',
	other: 'Other',
};

export const UserPage = () => {
	const [form] = Form.useForm();
	const [modalVisible, setModalVisible] = useState(false);
	const [deleteModalVisible, setDeleteModalVisible] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [users, setUsers] = useState(null);

	const allUser = useSelector(getAllUserSelector);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchUsers({currentPage, pageSize}));
	}, [dispatch]);

	useEffect(() => {
		setUsers(allUser.list_user);
	}, [allUser]);

	const handleCreateUser = () => {
		setModalVisible(true);
		form.resetFields();
	};

	const handleEdit = (record) => {
		form.setFieldsValue({
			user: record.name,
			email: record.email,
			phone: record.phone,
			role: record.role,
			gender: record.gender,
			dob: record.date_of_birth ? dayjs(record.date_of_birth) : null,
		});
		setSelectedUser(record);
		setModalVisible(true);
	};

	const handleDelete = (record) => {
		setSelectedUser(record);
		setDeleteModalVisible(true);
	};

	const handleDeleteConfirm = () => {
		dispatch(deleteUser(selectedUser.id));
		setDeleteModalVisible(false);
	};

	const handleDeleteCancel = () => {
		setDeleteModalVisible(false);
	};

	const handleModalSuccess = () => {
		form.validateFields()
			.then((values) => {
				if (selectedUser) {
					dispatch(updateUser({ userId: selectedUser.id, userData: values }));
				} else {
					// Add status field for creating a user
					values.status = 'active'; // Default status for new users
					dispatch(createUser(values));
				}
				setModalVisible(false);
				form.resetFields();
			})
			.catch((error) => {
				console.error('Form validation error:', error);
			});
	};
	
	const handleModalCancel = () => {
		setModalVisible(false);
		form.resetFields();
	};

	// Custom validation function for password field
	const validatePassword = (_, value) => {
		const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		if (!value || regex.test(value)) {
			return Promise.resolve();
		}
		return Promise.reject(
			'Password must contain at least 8 characters including uppercase letter, number, and special character.'
		);
	};

	return (
		<>
			<Helmet>
				<title>Manage User</title>
			</Helmet>
			<div className={styles.userContainer}>
				<div className={styles.userTitle}>
					<h1>Manage User</h1>
				</div>

				<div className={styles.createBtn}>
					<Button type="primary" onClick={handleCreateUser}>
						Create User
					</Button>
				</div>
				<div>
					<Table dataSource={users} rowKey="id" pagination={{pageSize: 5}}>
						<Column title="User" dataIndex="name" key="name" />
						<Column title="Email" dataIndex="email" key="email" />
						<Column title="Phone" dataIndex="phone" key="phone" />
						<Column
							title="Role"
							dataIndex="role"
							key="role"
							align="center"
							render={(role) => (
								<Tag
									style={{textAlign: 'center'}}
									color={
										role === 'player'
											? '#ab741a'
											: role === 'admin'
												? '#37297a'
												: role === 'coach'
													? '#f9a825'
													: role === 'stadium'
														? '#4878d9'
														: role === 'staff'
															? '#ff0000'
															: ''
									}
								>
									{typeof role === 'string'
										? role.charAt(0).toUpperCase() + role.slice(1)
										: ''}
								</Tag>
							)}
						/>
						<Column
							title="Date of birth"
							dataIndex="date_of_birth"
							key="date_of_birth"
						/>
						<Column title="Gender" dataIndex="gender" key="gender" />
						<Column title="Status" dataIndex="status" key="status" />

						<Column
							title="Action"
							key="action"
							render={(text, record) => (
								<span>
									<Button
										type="primary"
										style={{marginRight: 10}}
										onClick={() => handleEdit(record)}
									>
										<Tooltip title="Edit">
											<EditFilled />
										</Tooltip>
									</Button>
									<Button
										type="danger"
										style={{
											marginRight: 10,
											backgroundColor: '#ff0000',
											color: 'white',
										}}
										onClick={() => handleDelete(record)}
									>
										<Tooltip title="Delete">
											<DeleteFilled />
										</Tooltip>
									</Button>
								</span>
							)}
						/>
					</Table>
					<Modal
						title={selectedUser ? 'Edit User' : 'Create User'}
						visible={modalVisible}
						onOk={handleModalSuccess}
						onCancel={handleModalCancel}
					>
						<Form form={form} layout="vertical" className={styles.formContainer}>
							<Item label="User" name="name">
								<Input />
							</Item>
							<Item label="Email" name="email">
								<Input />
							</Item>
							<Item label="Phone" name="phone">
								<Input />
							</Item>
							<Item
								label="Password"
								name="password"
								// rules={[{validator: validatePassword}]}
							>
								<Input.Password />
							</Item>
							<Item label="Role" name="role">
								<Select>
									<Option value="player">player</Option>
									<Option value="admin">admin</Option>
									<Option value="coach">coach</Option>
									<Option value="stadium">stadium</Option>
									<Option value="staff">staff</Option>
								</Select>
							</Item>
							<Item label="Date of birth" name="dob">
								<DatePicker format="YYYY-MM-DD" />
							</Item>
							<Item label="Gender" name="gender">
								<Select>
									{Object.keys(UserGender).map((gender) => (
										<Option key={gender} value={gender}>
											{UserGender[gender]}
										</Option>
									))}
								</Select>
							</Item>
							<Item label="Status" name="status">
								<Select>
									<Option value="active">active</Option>
									<Option value="inactive">inactive</Option>
								</Select>
							</Item>
						</Form>
					</Modal>
					<Modal
						title="Confirm Delete"
						visible={deleteModalVisible}
						onOk={handleDeleteConfirm}
						onCancel={handleDeleteCancel}
					>
						<p>Are you sure you want to delete this user?</p>
					</Modal>
				</div>
			</div>
		</>
	);
};
