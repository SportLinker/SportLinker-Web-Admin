import {DeleteFilled, EditFilled} from '@ant-design/icons';
import {
	Button,
	DatePicker,
	Form,
	Input,
	Modal,
	Select,
	Table,
	Tag,
	TimePicker,
	Tooltip,
} from 'antd';
import moment from 'moment';
import React, {useState} from 'react';
import styles from './BetPage.module.css';
import SearchFilter from '../../components/SearchFilter/SearchFilter';

const {Column} = Table;
const {Item} = Form;

const dataSource = [
	{
		key: '1',
		betName: 'Bet 1',
		clb: 'CLB A',
		createBy: 'User 1',
		organizationDay: moment().subtract(1, 'days').format('YYYY-MM-DD'),
		organizationTime: '10:00 AM',
		status: 'Sắp diễn ra',
		location: 'Location 1',
	},
	{
		key: '2',
		betName: 'Bet 2',
		clb: 'CLB B',
		createBy: 'User 2',
		organizationDay: moment().subtract(2, 'days').format('YYYY-MM-DD'),
		organizationTime: '11:00 AM',
		status: 'Sắp diễn ra',
		location: 'Location 2',
	},
	{
		key: '3',
		betName: 'Bet 3',
		clb: 'CLB C',
		createBy: 'User 3',
		organizationDay: moment().subtract(3, 'days').format('YYYY-MM-DD'),
		organizationTime: '12:00 PM',
		status: 'Đang diễn ra',
		location: 'Location 3',
	},
	{
		key: '4',
		betName: 'Bet 4',
		clb: 'CLB D',
		createBy: 'User 4',
		organizationDay: moment().subtract(4, 'days').format('YYYY-MM-DD'),
		organizationTime: '01:00 PM',
		status: 'Đang diễn ra',
		location: 'Location 4',
	},
	{
		key: '5',
		betName: 'Bet 5',
		clb: 'CLB E',
		createBy: 'User 5',
		organizationDay: moment().subtract(5, 'days').format('YYYY-MM-DD'),
		organizationTime: '02:00 PM',
		status: 'Sắp diễn ra',
		location: 'Location 5',
	},
	{
		key: '6',
		betName: 'Bet 6',
		clb: 'CLB F',
		createBy: 'User 6',
		organizationDay: moment().subtract(6, 'days').format('YYYY-MM-DD'),
		organizationTime: '03:00 PM',
		status: 'Đang diễn ra',
		location: 'Location 6',
	},
	{
		key: '7',
		betName: 'Bet 7',
		clb: 'CLB G',
		createBy: 'User 7',
		organizationDay: moment().subtract(7, 'days').format('YYYY-MM-DD'),
		organizationTime: '04:00 PM',
		status: 'Sắp diễn ra',
		location: 'Location 7',
	},
	{
		key: '8',
		betName: 'Bet 8',
		clb: 'CLB H',
		createBy: 'User 8',
		organizationDay: moment().subtract(8, 'days').format('YYYY-MM-DD'),
		organizationTime: '05:00 PM',
		status: 'Đang diễn ra',
		location: 'Location 8',
	},
	{
		key: '9',
		betName: 'Bet 9',
		clb: 'CLB I',
		createBy: 'User 9',
		organizationDay: moment().subtract(9, 'days').format('YYYY-MM-DD'),
		organizationTime: '06:00 PM',
		status: 'Sắp diễn ra',
		location: 'Location 9',
	},
	{
		key: '10',
		betName: 'Bet 10',
		clb: 'CLB J',
		createBy: 'User 10',
		organizationDay: moment().subtract(10, 'days').format('YYYY-MM-DD'),
		organizationTime: '07:00 PM',
		status: 'Đang diễn ra',
		location: 'Location 10',
	},
];

export const BetPage = () => {
	const [form] = Form.useForm();
	const [modalVisible, setModalVisible] = useState(false);
	const [deleteModalVisible, setDeleteModalVisible] = useState(false);
	const [selectedBet, setSelectedBet] = useState(null);
	const [isEditMode, setIsEditMode] = useState(false);
	const [filteredDataSource, setFilteredDataSource] = useState(dataSource);

	console.log('filteredDataSource', filteredDataSource);

	const fields = [
		{label: 'Bet Name', name: 'betName'},
		{label: 'CLB', name: 'clb'},
		// Add more fields as needed
	];

	const handleSearch = (key, selectedFilters) => {
		const filteredData = dataSource.filter((item) => {
			const matchKey = Object.values(item).some((value) =>
				value.toString().toLowerCase().includes(key.toLowerCase())
			);
			const matchFilters = selectedFilters.every(
				(filter) =>
					item[filter] &&
					item[filter].toString().toLowerCase().includes(key.toLowerCase())
			);
			return matchKey && matchFilters;
		});
		setFilteredDataSource(filteredData);
	};

	const handleCreateBet = () => {
		setModalVisible(true);
		form.resetFields();
	};

	const handleEdit = (record) => {
		console.log('Edit bet:', record);
		form.setFieldsValue({
			betName: record.betName,
			clb: record.clb,
			createBy: record.createBy,
			organizationDay: moment(record.organizationDay, 'YYYY-MM-DD'),
			organizationTime: moment(record.organizationTime, 'HH:mm A'),
			status: record.status === 'Sắp diễn ra' ? 'Sắp diễn ra' : 'Đang diễn ra',
			location: record.location,
		});
		setIsEditMode(true); // Thiết lập chế độ chỉnh sửa
		setModalVisible(true);
	};

	const handleDelete = (record) => {
		console.log('Delete bet:', record);
		setSelectedBet(record);
		setDeleteModalVisible(true);
	};

	const handleDeleteConfirm = () => {
		console.log('Deleting bet:', selectedBet);
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
		<div className={styles.betContainer}>
			<div className={styles.betTitle}>
				<h1>Manage Bet</h1>
			</div>
			<SearchFilter fields={fields} onSearch={handleSearch} />
			<div className={styles.createBtn}>
				<Button type="primary" onClick={handleCreateBet}>
					Create Bet
				</Button>
			</div>
			<div>
				<Table
					dataSource={filteredDataSource || dataSource}
					rowKey="key"
					pagination={{pageSize: 5}}
				>
					<Column title="Bet Name" dataIndex="betName" key="betName" />
					<Column title="CLB" dataIndex="clb" key="clb" />
					<Column title="Create by" dataIndex="createBy" key="createBy" />
					<Column
						title="Organization Day"
						dataIndex="organizationDay"
						key="organizationDay"
						render={(organizationDay) => moment(organizationDay).format('MM-DD-YYYY')}
					/>
					<Column
						title="Organization Time"
						dataIndex="organizationTime"
						key="organizationTime"
					/>
					<Column
						title="Status"
						dataIndex="status"
						key="status"
						align="center"
						render={(role) => (
							<Tag
								style={{textAlign: 'center'}}
								color={
									role === 'Sắp diễn ra'
										? '#ab741a'
										: role === 'Đang diễn ra'
											? '#37297a'
											: ''
								}
							>
								{typeof role === 'string'
									? role.charAt(0).toUpperCase() + role.slice(1)
									: ''}
							</Tag>
						)}
					/>
					<Column title="Location" dataIndex="location" key="location" />
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
					title={'Create Bet'}
					visible={modalVisible}
					onOk={handleModalSuccess}
					onCancel={handleModalCancel}
				>
					<Form form={form} layout="vertical" className={styles.formContainer}>
						<Item
							label="Bet Name"
							name="betName"
							rules={[{required: true, message: 'Bet Name is required'}]}
						>
							<Input />
						</Item>
						<Item
							label="CLB"
							name="clb"
							rules={[{required: true, message: 'CLB is required'}]}
						>
							<Input />
						</Item>
						<Item
							label="Create By"
							name="createBy"
							rules={[{required: true, message: 'Create By is required'}]}
						>
							<Input />
						</Item>
						<Item
							label="Organization Day"
							name="organizationDay"
							rules={[{required: true, message: 'Organization Day is required'}]}
						>
							<DatePicker />
						</Item>
						<Item
							label="Organization Time"
							name="organizationTime"
							rules={[{required: true, message: 'Organization Time is required'}]}
						>
							<TimePicker format="hh:mm A" />
						</Item>

						<Item
							label="Status"
							name="status"
							rules={[{required: true, message: 'Status is required'}]}
						>
							<Select>
								<Select.Option value="Sắp diễn ra">Sắp diễn ra</Select.Option>
								<Select.Option value="Đang diễn ra" disabled={!isEditMode}>
									Đang diễn ra
								</Select.Option>
							</Select>
						</Item>

						<Item
							label="Location"
							name="location"
							rules={[{required: true, message: 'Location is required'}]}
						>
							<Input />
						</Item>
					</Form>
				</Modal>
				<Modal
					title="Confirm Delete"
					visible={deleteModalVisible}
					onOk={handleDeleteConfirm}
					onCancel={handleDeleteCancel}
				>
					<p>{`Are you sure you want to delete "${selectedBet ? selectedBet.betName : ''}"?`}</p>
				</Modal>
			</div>
		</div>
	);
};
