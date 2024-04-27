import {DeleteFilled, EditFilled} from '@ant-design/icons';
import {Button, DatePicker, Form, Input, Modal, Select, Table, Tag, Tooltip} from 'antd';
import moment from 'moment';
import React, {useState} from 'react';
import styles from './UserPage.module.css';

const {Column} = Table;
const {Item} = Form;

const dataSource = [
	{
		key: '1',
		user: 'John Doe',
		email: 'john.doe@example.com',
		address: '123 Main St, Anytown, CA 12345',
		role: 'Người dùng',
		dob: moment().subtract(30, 'years').format('YYYY-MM-DD'),
		dateJoin: moment().format('YYYY-MM-DD'),
	},
	{
		key: '2',
		user: 'Jane Smith',
		email: 'jane.smith@example.com',
		address: '456 Elm St, Anytown, CA 12345',
		role: 'Shop',
		dob: moment().subtract(25, 'years').format('YYYY-MM-DD'),
		dateJoin: moment().subtract(2, 'weeks').format('YYYY-MM-DD'),
	},
	{
		key: '3',
		user: 'Alice Johnson',
		email: 'alice.johnson@example.com',
		address: '789 Oak St, Anytown, CA 12345',
		role: 'Người dùng',
		dob: moment().subtract(40, 'years').format('YYYY-MM-DD'),
		dateJoin: moment().subtract(1, 'month').format('YYYY-MM-DD'),
	},
	{
		key: '4',
		user: 'Bob Smith',
		email: 'bob.smith@example.com',
		address: '1011 Pine St, Anytown, CA 12345',
		role: 'hlv',
		dob: moment().subtract(35, 'years').format('YYYY-MM-DD'),
		dateJoin: moment().subtract(3, 'days').format('YYYY-MM-DD'),
	},
	{
		key: '5',
		user: 'Emma Garcia',
		email: 'emma.garcia@example.com',
		address: '1234 Maple St, Anytown, CA 12345',
		role: 'Shop',
		dob: moment().subtract(28, 'years').format('YYYY-MM-DD'),
		dateJoin: moment().subtract(2, 'months').format('YYYY-MM-DD'),
	},
	{
		key: '6',
		user: 'David Miller',
		email: 'david.miller@example.com',
		address: '5678 Elm St, Anytown, CA 12345',
		role: 'Sân',
		dob: moment().subtract(45, 'years').format('YYYY-MM-DD'),
		dateJoin: moment().subtract(6, 'months').format('YYYY-MM-DD'),
	},
	{
		key: '7',
		user: 'Olivia Jones',
		email: 'olivia.jones@example.com',
		address: '9012 Oak St, Anytown, CA 12345',
		role: 'Người dùng',
		dob: moment().subtract(22, 'years').format('YYYY-MM-DD'),
		dateJoin: moment().subtract(1, 'week').format('YYYY-MM-DD'),
	},
	{
		key: '8',
		user: 'Charles Brown',
		email: 'charles.brown@example.com',
		address: '1357 Pine St, Anytown, CA 12345',
		role: 'Shop',
		dob: moment().subtract(32, 'years').format('YYYY-MM-DD'),
		dateJoin: moment().subtract(4, 'days').format('YYYY-MM-DD'),
	},
	// Add 2 more data objects...
	{
		key: '9',
		user: 'Sarah Lee',
		email: 'sarah.lee@example.com',
		address: '2468 Cedar St, Anytown, CA 12345',
		role: 'Sân',
		dob: moment().subtract(38, 'years').format('YYYY-MM-DD'),
		dateJoin: moment().subtract(1, 'year').format('YYYY-MM-DD'),
	},
	{
		key: '10',
		user: 'Michael Johnson',
		email: 'michael.johnson@example.com',
		address: '369 Pine St, Anytown, CA 12345',
		role: 'Người dùng',
		dob: moment().subtract(29, 'years').format('YYYY-MM-DD'),
		dateJoin: moment().subtract(3, 'months').format('YYYY-MM-DD'),
	},
];

export const UserPage = () => {
	const [form] = Form.useForm();
	const [modalVisible, setModalVisible] = useState(false);
	const [deleteModalVisible, setDeleteModalVisible] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);

	const handleCreateUser = () => {
		setModalVisible(true);
		form.resetFields(); // Reset form fields when creating a new user
	};

	const handleEdit = (record) => {
		console.log('Edit user:', record);
		form.setFieldsValue({
			user: record.user,
			email: record.email,
			address: record.address,
			role: record.role,
			dob: moment(record.dob, 'YYYY-MM-DD'),
			dateJoin: moment(record.dateJoin, 'YYYY-MM-DD'),
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
		// Perform delete operation here
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
				<Table dataSource={dataSource} rowKey="key" pagination={{pageSize: 5}}>
					<Column title="User" dataIndex="user" key="user" />
					<Column title="Address" dataIndex="address" key="address" />
					<Column
						title="Role"
						dataIndex="role"
						key="role"
						align="center"
						render={(role) => (
							<Tag
								style={{width: 80, textAlign: 'center'}}
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
						render={(dob) => moment(dob).format('MM-DD-YYYY')}
					/>
					<Column
						title="Date join"
						dataIndex="dateJoin"
						key="dateJoin"
						render={(dateJoin) => moment(dateJoin).format('MM-DD-YYYY')}
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
							<DatePicker />
						</Item>
						<Item
							label="Date join"
							name="dateJoin"
							rules={[{required: true, message: 'Date join is required'}]}
						>
							<DatePicker />
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
