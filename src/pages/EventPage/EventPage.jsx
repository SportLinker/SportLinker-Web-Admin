import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Modal, Select, Table, Tooltip, Tag} from 'antd';
import {Helmet} from 'react-helmet';
import dayjs from 'dayjs';
import {fetchEvents} from '../../redux/slices/eventSlice';
import {getAllEventSelector} from '../../redux/selectors';
import styles from './EventPage.module.css';

const {Column} = Table;
const {Option} = Select;

export const EventPage = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [totalPage, setTotalPage] = useState(1);
	const [events, setEvents] = useState(null);
	const [month, setMonth] = useState(new Date().getMonth() + 1); // Default to current month
	const [year, setYear] = useState(new Date().getFullYear()); // Default to current year
	const [selectedMatch, setSelectedMatch] = useState(null); // State for selected match
	const [matchModalVisible, setMatchModalVisible] = useState(false); // State for modal visibility

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
		dispatch(fetchEvents({currentPage, pageSize, month, year}));
	}, [dispatch, currentPage, pageSize, month, year]);

	useEffect(() => {
		setEvents(allEvents?.matches);
		setTotalPage(allEvents.total_page);
	}, [allEvents]);

	// Function to handle row click
	const handleRowClick = (record) => {
		setSelectedMatch(record);
		setMatchModalVisible(true);
	};

	// Function to handle modal close
	const handleModalClose = () => {
		setMatchModalVisible(false);
		setSelectedMatch(null);
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
					<Table
						dataSource={events}
						rowKey="match_id"
						pagination={{
							pageSize,
							current: currentPage,
							total: totalPage * pageSize,
							onChange: (page, size) => {
								setCurrentPage(page);
								setPageSize(size);
							},
						}}
						onRow={(record) => ({
							onClick: () => handleRowClick(record),
						})}
					>
						<Column
							title="Match Name"
							dataIndex="match_name"
							key="match_name"
							render={(text, record) => <span>{text}</span>}
						/>
						<Column title="Sport Name" dataIndex="sport_name" key="sport_name" />
						<Column
							title="Creators"
							key="creators"
							render={(text, record) => (
								<div style={{display: 'flex', alignItems: 'center'}}>
									<img
										src={record.user_create.avatar_url}
										alt="Avatar"
										style={{
											marginRight: 8,
											borderRadius: '50%',
											width: 30,
											height: 30,
										}}
									/>
									<span>{record.user_create.name}</span>
								</div>
							)}
						/>
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
						<Column
							title="Status"
							dataIndex="status"
							key="status"
							render={(status) => (
								<Tag
									color={
										status === 'completed'
											? 'green'
											: status === 'cancelled'
												? 'orange'
												: 'red'
									}
								>
									{status.toUpperCase()}
								</Tag>
							)}
						/>
					</Table>

					<Modal
						title="Match Details"
						visible={matchModalVisible}
						onCancel={handleModalClose}
						footer={null}
					>
						{selectedMatch && (
							<div>
								<p>
									<strong>Match Name:</strong> {selectedMatch.match_name}
								</p>
								<p>
									<strong>Sport Name:</strong> {selectedMatch.sport_name}
								</p>
								<p>
									<strong>Total Join:</strong> {selectedMatch.total_join}
								</p>
								<p>
									<strong>Maximum Join:</strong> {selectedMatch.maximum_join}
								</p>
								<p>
									<strong>Start Time:</strong>{' '}
									{selectedMatch.start_time
										? dayjs(selectedMatch.start_time).format('DD-MM-YYYY HH:mm')
										: ''}
								</p>
								<p>
									<strong>End Time:</strong>{' '}
									{selectedMatch.end_time
										? dayjs(selectedMatch.end_time).format('DD-MM-YYYY HH:mm')
										: ''}
								</p>
								<p>
									<strong>Status:</strong> {selectedMatch.status}
								</p>
								<p>
									<strong>Creator:</strong> {selectedMatch.user_create.name}
								</p>
								<div style={{display: 'flex', alignItems: 'center'}}>
									<img
										src={selectedMatch.user_create.avatar_url}
										alt="Avatar"
										style={{
											marginRight: 8,
											borderRadius: '50%',
											width: 30,
											height: 30,
										}}
									/>
								</div>
							</div>
						)}
					</Modal>
				</div>
			</div>
		</>
	);
};
