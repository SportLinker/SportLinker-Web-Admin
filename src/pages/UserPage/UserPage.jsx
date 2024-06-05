import {DeleteFilled, EditFilled} from '@ant-design/icons';
import {Button, DatePicker, Form, Input, Modal, Select, Table, Tag, Tooltip} from 'antd';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {getAllUserSelector} from '../../redux/selectors';
import {fetchUsers} from '../../redux/slices/userSlice';
import styles from './UserPage.module.css';
import {Helmet} from 'react-helmet';

const {Column} = Table;
const {Item} = Form;

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

	console.log('allUser', allUser);
	console.log('users', users);

	const handleCreateUser = () => {
		setModalVisible(true);
		form.resetFields();
	};

	const handleEdit = (record) => {
		console.log('Edit user:', record);

		form.setFieldsValue({
			user: record.user,
			email: record.email,
			address: record.address,
			role: record.role,
		});
		setModalVisible(true);
	};

	const handleDelete = (record) => {
		console.log('Delete user:', record);
		setSelectedUser(record);
		setDeleteModalVisible(true);
	};

	const handleDeleteConfirm = () => {
		console.log('Deleting user:', selectedUser);
		setDeleteModalVisible(false);
	};

	const handleDeleteCancel = () => {
		setDeleteModalVisible(false);
	};

	const handleModalSuccess = () => {
		form.validateFields()
			.then((values) => {
				console.log('Submitted form values:', values);
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
												: role === 'hlv'
													? '#f9a825'
													: role === 'Sân'
														? '#4878d9'
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
						title={'Create User'}
						visible={modalVisible}
						onOk={handleModalSuccess}
						onCancel={handleModalCancel}
					>
						<Form form={form} layout="vertical" className={styles.formContainer}>
							<Item
								label="User"
								name="user"
								rules={[{required: true, message: 'User is required'}]}
							>
								<Input />
							</Item>
							<Item
								label="Email"
								name="email"
								rules={[{required: true, message: 'Email is required'}]}
							>
								<Input />
							</Item>
							<Item
								label="Address"
								name="address"
								rules={[{required: true, message: 'Address is required'}]}
							>
								<Input />
							</Item>
							<Item
								label="Role"
								name="role"
								rules={[{required: true, message: 'Role is required'}]}
							>
								<Select>
									<Select.Option value="Người dùng">Người dùng</Select.Option>
									<Select.Option value="Shop">Shop</Select.Option>
									<Select.Option value="hlv">hlv</Select.Option>
									<Select.Option value="Sân">Sân</Select.Option>
								</Select>
							</Item>
							<Item
								label="Date of birth"
								name="dob"
								rules={[{required: true, message: 'Date of birth is required'}]}
							>
								<DatePicker format="YYYY-MM-DD" />
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
