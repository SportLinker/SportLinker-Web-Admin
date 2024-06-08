import React, { useEffect, useState } from 'react'; // Make sure to import useState from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, DatePicker, Form, Input, Modal, Select, Table, Tooltip } from 'antd';
import { Helmet } from 'react-helmet';
import dayjs from 'dayjs';
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../../redux/slices/eventSlice';
import { getAllEventSelector } from '../../redux/selectors';
import styles from './EventPage.module.css';
import { EditFilled } from '@ant-design/icons';
import { DeleteFilled } from '@ant-design/icons';

const { Column } = Table;
const { Item } = Form;
const { Option } = Select;

export const EventPage = () => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [events, setEvents] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Default to current month
  const [year, setYear] = useState(new Date().getFullYear()); // Default to current year

  const allEvents = useSelector(getAllEventSelector);
  const dispatch = useDispatch();


  // Function to handle month change
  const handleMonthChange = (value) => {
    setMonth(value);
  };

  // Function to handle year change
  const handleYearChange = (value) => {
    setYear(value);
  };

  useEffect(() => {
    dispatch(fetchEvents({ currentPage, pageSize, month, year }));
  }, [dispatch, currentPage, pageSize, month, year]);

  useEffect(() => {
    setEvents(allEvents?.matches);
  }, [allEvents]);

	const handleCreateEvent = () => {
		setModalVisible(true);
		form.resetFields();
	};

	const handleEdit = (record) => {
		form.setFieldsValue({
			match_name: record.match_name,
			sport_name: record.sport_name,
			total_join: record.total_join,
			maximum_join: record.maximum_join,
			start_time: record.start_time ? dayjs(record.start_time) : null,
			end_time: record.end_time ? dayjs(record.end_time) : null,
			status: record.status,
		});
		setSelectedEvent(record);
		setModalVisible(true);
	};

	const handleDelete = (record) => {
		setSelectedEvent(record);
		setDeleteModalVisible(true);
	};

	const handleDeleteConfirm = () => {
		dispatch(deleteEvent(selectedEvent.match_id)).then(() =>
			dispatch(fetchEvents({currentPage, pageSize}))
		);
		setDeleteModalVisible(false);
	};

	const handleDeleteCancel = () => {
		setDeleteModalVisible(false);
	};

	const handleModalSuccess = () => {
		form.validateFields()
			.then((values) => {
				if (values.start_time) {
					values.start_time = dayjs(values.start_time).toISOString();
				}
				if (values.end_time) {
					values.end_time = dayjs(values.end_time).toISOString();
				}
				if (selectedEvent) {
					dispatch(
						updateEvent({eventId: selectedEvent.match_id, eventData: values})
					).then(() => dispatch(fetchEvents({currentPage, pageSize})));
				} else {
					dispatch(createEvent(values));
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

	return (
		<>
			<Helmet>
				<title>Manage Events</title>
			</Helmet>
			<div className={styles.eventContainer}>
				<div className={styles.eventTitle}>
					<h1>Manage Events</h1>
				</div>

				<div className={styles.createBtn}>
					<Button type="primary" onClick={handleCreateEvent}>
						Create Event
					</Button>
					<Select
						defaultValue={dayjs()
							.month(month - 1)
							.format('MMMM')} // Format the default value to display month name
						onChange={handleMonthChange}
						style={{marginLeft: '1rem', width: 120}}
					>
						{Array.from({length: 12}, (_, i) => (
							<Option key={i + 1} value={i + 1}>
								{dayjs().month(i).format('MMMM')} {/* Format month name */}
							</Option>
						))}
					</Select>
					<Select
						defaultValue={year}
						onChange={handleYearChange}
						style={{marginLeft: '1rem', width: 100}}
					>
						{Array.from({length: 5}, (_, i) => (
							<Option
								key={i + new Date().getFullYear()}
								value={i + new Date().getFullYear()}
							>
								{i + new Date().getFullYear()}
							</Option>
						))}
					</Select>
				</div>
				<div>
					<Table dataSource={events} rowKey="match_id" pagination={{pageSize: 5}}>
						<Column title="Match Name" dataIndex="match_name" key="match_name" />
						<Column title="Sport Name" dataIndex="sport_name" key="sport_name" />
						<Column title="Total Join" dataIndex="total_join" key="total_join" />
						<Column title="Maximum Join" dataIndex="maximum_join" key="maximum_join" />
						<Column
							title="Start Time"
							dataIndex="start_time"
							key="start_time"
							render={(start_time) =>
								start_time ? dayjs(start_time).format('DD-MM-YYYY HH:mm') : ''
							}
						/>
						<Column
							title="End Time"
							dataIndex="end_time"
							key="end_time"
							render={(end_time) =>
								end_time ? dayjs(end_time).format('DD-MM-YYYY HH:mm') : ''
							}
						/>
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
						title={selectedEvent ? 'Edit Event' : 'Create Event'}
						visible={modalVisible}
						onOk={handleModalSuccess}
						onCancel={handleModalCancel}
					>
						<Form form={form} layout="vertical" className={styles.formContainer}>
							<Item label="Match Name" name="match_name">
								<Input />
							</Item>
							<Item label="Sport Name" name="sport_name">
								<Input />
							</Item>
							<Item label="Total Join" name="total_join">
								<Input type="number" />
							</Item>
							<Item label="Maximum Join" name="maximum_join">
								<Input type="number" />
							</Item>
							<Item label="Start Time" name="start_time">
								<DatePicker showTime format="DD-MM-YYYY HH:mm" />
							</Item>
							<Item label="End Time" name="end_time">
								<DatePicker showTime format="DD-MM-YYYY HH:mm" />
							</Item>
							<Item label="Status" name="status">
								<Select>
									<Option value="upcoming">upcoming</Option>
									<Option value="ongoing">ongoing</Option>
									<Option value="completed">completed</Option>
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
						<p>Are you sure you want to delete this event?</p>
					</Modal>
				</div>
			</div>
		</>
	);
};
