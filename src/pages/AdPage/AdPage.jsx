import {Button, Form, Modal, Table, Tag, Tooltip} from 'antd';
import moment from 'moment';
import React, {useState} from 'react';
import styles from './AdPage.module.css';
import SearchFilter from '../../components/SearchFilter/SearchFilter';
import {Helmet} from 'react-helmet';

const {Column} = Table;
const {Item} = Form;

const dataSource = [
	{
		key: '1',
		postId: 'AD001',
		createdAt: moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm'),
		expiresAt: moment().add(30, 'days').format('YYYY-MM-DD HH:mm'),
		userJoin: 'John',
		adName: 'Special Summer Sale',
		status: 'Success',
	},
	{
		key: '2',
		postId: 'AD002',
		createdAt: moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm'),
		expiresAt: moment().add(15, 'days').format('YYYY-MM-DD HH:mm'),
		userJoin: 'Alice',
		adName: 'Flash Deal: 50% Off',
		status: 'Fail',
	},
	{
		key: '3',
		postId: 'AD003',
		createdAt: moment().subtract(3, 'days').format('YYYY-MM-DD HH:mm'),
		expiresAt: moment().add(20, 'days').format('YYYY-MM-DD HH:mm'),
		userJoin: 'Bob',
		adName: 'Back to School Promo',
		status: 'Cancel',
	},
	{
		key: '4',
		postId: 'AD004',
		createdAt: moment().subtract(4, 'days').format('YYYY-MM-DD HH:mm'),
		expiresAt: moment().add(25, 'days').format('YYYY-MM-DD HH:mm'),
		userJoin: 'Charlie',
		adName: 'Holiday Discount: 20% Off',
		status: 'Success',
	},
	{
		key: '5',
		postId: 'AD005',
		createdAt: moment().subtract(5, 'days').format('YYYY-MM-DD HH:mm'),
		expiresAt: moment().add(10, 'days').format('YYYY-MM-DD HH:mm'),
		userJoin: 'Eve',
		adName: 'Weekend Flash Sale',
		status: 'Fail',
	},
	{
		key: '6',
		postId: 'AD006',
		createdAt: moment().subtract(6, 'days').format('YYYY-MM-DD HH:mm'),
		expiresAt: moment().add(30, 'days').format('YYYY-MM-DD HH:mm'),
		userJoin: 'Frank',
		adName: 'Winter Clearance: Up to 70% Off',
		status: 'Success',
	},
	{
		key: '7',
		postId: 'AD007',
		createdAt: moment().subtract(7, 'days').format('YYYY-MM-DD HH:mm'),
		expiresAt: moment().add(15, 'days').format('YYYY-MM-DD HH:mm'),
		userJoin: 'Grace',
		adName: 'New Year Special: Buy One Get One Free',
		status: 'Fail',
	},
	{
		key: '8',
		postId: 'AD008',
		createdAt: moment().subtract(8, 'days').format('YYYY-MM-DD HH:mm'),
		expiresAt: moment().add(20, 'days').format('YYYY-MM-DD HH:mm'),
		userJoin: 'Harry',
		adName: 'Tech Expo: Exclusive Discounts',
		status: 'Cancel',
	},
	{
		key: '9',
		postId: 'AD009',
		createdAt: moment().subtract(9, 'days').format('YYYY-MM-DD HH:mm'),
		expiresAt: moment().add(25, 'days').format('YYYY-MM-DD HH:mm'),
		userJoin: 'Isabelle',
		adName: 'Spring Collection Launch',
		status: 'Success',
	},
	{
		key: '10',
		postId: 'AD010',
		createdAt: moment().subtract(10, 'days').format('YYYY-MM-DD HH:mm'),
		expiresAt: moment().add(10, 'days').format('YYYY-MM-DD HH:mm'),
		userJoin: 'Jack',
		adName: 'Limited Time Offer: Free Shipping',
		status: 'Fail',
	},
	{
		key: '11',
		postId: 'AD011',
		createdAt: moment().subtract(11, 'days').format('YYYY-MM-DD HH:mm'),
		expiresAt: moment().add(30, 'days').format('YYYY-MM-DD HH:mm'),
		userJoin: 'Kate',
		adName: 'Summer Sale: Buy Two Get One Free',
		status: 'Success',
	},
	{
		key: '12',
		postId: 'AD012',
		createdAt: moment().subtract(12, 'days').format('YYYY-MM-DD HH:mm'),
		expiresAt: moment().add(15, 'days').format('YYYY-MM-DD HH:mm'),
		userJoin: 'Leo',
		adName: 'Clearance Sale: Last Chance Deals',
		status: 'Cancel',
	},
];

export const AdPage = () => {
	const [form] = Form.useForm();
	const [modalVisible, setModalVisible] = useState(false);
	const [deleteModalVisible, setDeleteModalVisible] = useState(false);
	const [selectedAd, setSelectedAd] = useState(null);
	const [isEditMode, setIsEditMode] = useState(false);

	const fields = [
		{label: 'Post ID', name: 'postId'},
		{label: 'Created At', name: 'createdAt'},
		{label: 'Expires At', name: 'expiresAt'},
		{label: 'User Join', name: 'userJoin'},
		{label: 'Ad Name', name: 'adName'},
		{label: 'Status', name: 'status', type: 'Status', options: ['Success', 'Fail', 'Cancel']},
		// Add more fields as needed
	];

	const handleSearch = (values) => {
		// Handle search logic here
		console.log('Search values:', values);
	};

	const handleCreateAd = () => {
		setModalVisible(true);
		form.resetFields();
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
				<title>Manage Advertisement</title>
			</Helmet>
			<div className={styles.adContainer}>
				<div className={styles.adTitle}>
					<h1>Manage Ads</h1>
				</div>
				<SearchFilter fields={fields} onSearch={handleSearch} />
				<div className={styles.createBtn}>
					<Button type="primary" onClick={handleCreateAd}>
						Create Ad
					</Button>
				</div>
				<div>
					<Table dataSource={dataSource} rowKey="key" pagination={{pageSize: 5}}>
						<Column title="Post ID" dataIndex="postId" key="postId" />
						<Column title="Created At" dataIndex="createdAt" key="createdAt" />
						<Column title="Expires At" dataIndex="expiresAt" key="expiresAt" />
						<Column title="User Join" dataIndex="userJoin" key="userJoin" />
						<Column title="Ad Name" dataIndex="adName" key="adName" />
						<Column
							title="Status"
							dataIndex="status"
							key="status"
							render={(status) => (
								<Tag
									color={
										status === 'Success'
											? 'green'
											: status === 'Fail'
												? 'red'
												: 'orange'
									}
								>
									{status}
								</Tag>
							)}
						/>
						<Column
							title="Action"
							key="action"
							render={(text, record) => (
								<span>
									<Button type="primary" style={{marginRight: 10}}>
										<Tooltip title="Edit">Edit</Tooltip>
									</Button>
									<Button
										type="danger"
										style={{backgroundColor: '#ff0000', color: 'white'}}
									>
										<Tooltip title="Delete">Delete</Tooltip>
									</Button>
								</span>
							)}
						/>
					</Table>
					{/* Modals for Create and Delete */}
				</div>
			</div>
		</>
	);
};

export default AdPage;
