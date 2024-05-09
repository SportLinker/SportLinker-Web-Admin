import {DeleteFilled, EditFilled} from '@ant-design/icons';
import {Button, DatePicker, Form, Input, Modal, Select, Table, Tag, Tooltip} from 'antd';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {getAllUserSelector} from '../../redux/selectors';
import {fetchUsers} from '../../redux/slices/userSlice';
import styles from './UserPage.module.css';

const {Column} = Table;
const {Item} = Form;

export const UserPage = () => {
	const [form] = Form.useForm();
	const [modalVisible, setModalVisible] = useState(false);
	const [deleteModalVisible, setDeleteModalVisible] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);

	const users = useSelector(getAllUserSelector);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchUsers());
	}, []);

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
				<Table dataSource={users} rowKey="key" pagination={{pageSize: 5}}>
					<Column title="User" dataIndex="user" key="user" />
					<Column title="Email" dataIndex="email" key="address" />
					<Column title="Address" dataIndex="address" key="address" />
					<Column
						title="Role"
						dataIndex="role"
						key="role"
						align="center"
						render={(role) => (
							<Tag
								style={{textAlign: 'center'}}
								color={
									role === 'Người dùng'
										? '#ab741a'
										: role === 'Shop'
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
						dataIndex="dob"
						key="dob"
						render={(dob) => dayjs(dob * 1000).format('YYYY-MM-DD')}
					/>
					<Column
						title="Date join"
						dataIndex="dateJoin"
						key="dateJoin"
						render={(dateJoin) => dayjs(dateJoin * 1000).format('YYYY-MM-DD')}
					/>

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
	);
};
