import {DeleteFilled, EditFilled} from '@ant-design/icons';
import {Button, Form, Modal, Table, Tag, Tooltip} from 'antd';
import moment from 'moment';
import React, {useState} from 'react';
import styles from './ReportPage.module.css';
import SearchFilter from '../../components/SearchFilter/SearchFilter';
import {Helmet} from 'react-helmet';

const {Column} = Table;
const {Item} = Form;

const dataSource = [
	{
		key: '1',
		user: 'Alice',
		reportedUser: 'John',
		title: 'Spam Report',
		description: 'This user is posting spammy content.',
		time: moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm'),
		status: 'Pending',
	},
	{
		key: '2',
		user: 'Bob',
		reportedUser: 'Mary',
		title: 'Harassment Report',
		description: 'Bob is harassing other users in comments.',
		time: moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm'),
		status: 'In Progress',
	},
	{
		key: '3',
		user: 'Charlie',
		reportedUser: 'David',
		title: 'Impersonation Report',
		description: 'Someone is impersonating Charlie.',
		time: moment().subtract(3, 'days').format('YYYY-MM-DD HH:mm'),
		status: 'Completed',
	},
	{
		key: '4',
		user: 'Dave',
		reportedUser: 'Sophie',
		title: 'Fake Account Report',
		description: 'This account seems to be fake.',
		time: moment().subtract(4, 'days').format('YYYY-MM-DD HH:mm'),
		status: 'Pending',
	},
	{
		key: '5',
		user: 'Eve',
		reportedUser: 'Alex',
		title: 'Hate Speech Report',
		description: 'Eve is spreading hate speech in comments.',
		time: moment().subtract(5, 'days').format('YYYY-MM-DD HH:mm'),
		status: 'In Progress',
	},
	{
		key: '6',
		user: 'Frank',
		reportedUser: 'Lucy',
		title: 'Misinformation Report',
		description: 'Frank is spreading misinformation about COVID-19.',
		time: moment().subtract(6, 'days').format('YYYY-MM-DD HH:mm'),
		status: 'Completed',
	},
	{
		key: '7',
		user: 'Grace',
		reportedUser: 'Michael',
		title: 'Bullying Report',
		description: 'Grace is bullying other users in private messages.',
		time: moment().subtract(7, 'days').format('YYYY-MM-DD HH:mm'),
		status: 'Pending',
	},
	{
		key: '8',
		user: 'Harry',
		reportedUser: 'Olivia',
		title: 'Fraudulent Activity Report',
		description: 'Harry is engaging in fraudulent activity.',
		time: moment().subtract(8, 'days').format('YYYY-MM-DD HH:mm'),
		status: 'In Progress',
	},
	{
		key: '9',
		user: 'Isabelle',
		reportedUser: 'Henry',
		title: 'Solicitation Report',
		description: 'Isabelle is soliciting other users for inappropriate purposes.',
		time: moment().subtract(9, 'days').format('YYYY-MM-DD HH:mm'),
		status: 'Pending',
	},
	{
		key: '10',
		user: 'Jack',
		reportedUser: 'Sophia',
		title: 'Privacy Violation Report',
		description: 'Jack is sharing private information of other users without consent.',
		time: moment().subtract(10, 'days').format('YYYY-MM-DD HH:mm'),
		status: 'Completed',
	},
	{
		key: '11',
		user: 'Kate',
		reportedUser: 'Ryan',
		title: 'Inappropriate Content Report',
		description: 'Kate is posting inappropriate content.',
		time: moment().subtract(11, 'days').format('YYYY-MM-DD HH:mm'),
		status: 'Pending',
	},
	// Add 11 more data items
];

export const ReportPage = () => {
	const [form] = Form.useForm();
	const [modalVisible, setModalVisible] = useState(false);
	const [deleteModalVisible, setDeleteModalVisible] = useState(false);
	const [selectedReport, setSelectedReport] = useState(null);
	const [isEditMode, setIsEditMode] = useState(false);

	const fields = [
		{label: 'User', name: 'user'},
		{label: 'Reported User', name: 'reportedUser'},
		{label: 'Title', name: 'title'},
		{label: 'Description', name: 'description', type: 'TextArea'},
		{label: 'Time', name: 'time', type: 'Date'}, // Modify this line
		{
			label: 'Status',
			name: 'status',
			type: 'Status',
			options: ['Pending', 'In Progress', 'Completed'],
		}, // Modify this line
		// Add more fields as needed
	];

	const handleSearch = (values) => {
		// Handle search logic here
		console.log('Search values:', values);
	};

	const handleCreateReport = () => {
		setModalVisible(true);
		form.resetFields();
	};

	// Similar handlers for edit and delete

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
				<title>Manage Reports</title>
			</Helmet>
			<div className={styles.reportContainer}>
				<div className={styles.reportTitle}>
					<h1>Manage Reports</h1>
				</div>
				<SearchFilter fields={fields} onSearch={handleSearch} />
				<div className={styles.createBtn}>
					<Button type="primary" onClick={handleCreateReport}>
						Create Report
					</Button>
				</div>
				<div>
					<Table dataSource={dataSource} rowKey="key" pagination={{pageSize: 5}}>
						<Column title="User" dataIndex="user" key="user" />
						<Column title="Reported User" dataIndex="reportedUser" key="reportedUser" />
						<Column title="Title" dataIndex="title" key="title" />
						<Column
							title="Description"
							dataIndex="description"
							key="description"
							ellipsis={{showTitle: false}}
							render={(text) => (
								<Tooltip placement="topLeft" title={text}>
									{text}
								</Tooltip>
							)}
						/>

						<Column title="Time" dataIndex="time" key="time" />
						<Column
							title="Status"
							dataIndex="status"
							key="status"
							render={(status) => (
								<Tag
									color={
										status === 'Pending'
											? 'orange'
											: status === 'In Progress'
												? 'blue'
												: 'green'
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
										<Tooltip title="Edit">
											<EditFilled />
										</Tooltip>
									</Button>
									<Button
										type="danger"
										style={{backgroundColor: '#ff0000', color: 'white'}}
									>
										<Tooltip title="Delete">
											<DeleteFilled />
										</Tooltip>
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

export default ReportPage;
