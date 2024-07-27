import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Modal, Table} from 'antd';
import {Helmet} from 'react-helmet';
import {fetchBookings} from '../../redux/slices/bookingSlice';
import {getAllBookingSelector, getLoadingBookingSelector} from '../../redux/selectors';
import styles from './BookingPage.module.css';

const {Column} = Table;

export const BookingPage = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [bookings, setBookings] = useState([]);
	const [totalPage, setTotalPage] = useState(1);
	const [selectedBooking, setSelectedBooking] = useState(null);
	const [bookingModalVisible, setBookingModalVisible] = useState(false);

	const allBookings = useSelector(getAllBookingSelector);
	const loading = useSelector(getLoadingBookingSelector);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchBookings({currentPage, pageSize}));
	}, [dispatch, currentPage, pageSize]);

	useEffect(() => {
		setBookings(allBookings.bookings || []);
		setTotalPage(allBookings.total_page || 1);
	}, [allBookings]);

	const handleRowClick = (record) => {
		setSelectedBooking(record);
		setBookingModalVisible(true);
	};

	const handleModalClose = () => {
		setBookingModalVisible(false);
		setSelectedBooking(null);
	};

	return (
		<>
			<Helmet>
				<title>Manage Bookings</title>
			</Helmet>
			<div className={styles.bookingContainer}>
				<div className={styles.bookingTitle}>
					<h1>Manage Bookings</h1>
				</div>
				<Table
					dataSource={bookings}
					rowKey="id"
					pagination={{
						pageSize,
						current: currentPage,
						total: totalPage * pageSize,
						onChange: (page, size) => {
							setCurrentPage(page);
							setPageSize(size);
						},
					}}
					loading={loading}
					onRow={(record) => ({
						onClick: () => handleRowClick(record),
					})}
				>
					<Column title="Yard Name" dataIndex={['yard', 'yard_name']} key="yard_name" />
					<Column
						title="Stadium Name"
						dataIndex={['yard', 'stadium', 'stadium_name']}
						key="stadium_name"
					/>
					<Column
						title="Price per Hour"
						dataIndex={['yard', 'price_per_hour']}
						key="price_per_hour"
						render={(text) => `${text.toLocaleString()}₫`}
					/>
					<Column
						title="Booking Status"
						dataIndex="status"
						key="status"
						render={(status) => (
							<span
								className={
									status === 'pending'
										? styles.pendingStatus
										: styles.confirmedStatus
								}
							>
								{status.charAt(0).toUpperCase() + status.slice(1)}
							</span>
						)}
					/>
				</Table>

				<Modal
					title="Booking Details"
					visible={bookingModalVisible}
					onCancel={handleModalClose}
					footer={null}
					className={styles.bookingModal}
				>
					{selectedBooking && (
						<div className={styles.bookingDetails}>
							<div className={styles.bookingDetailsGrid}>
								<div className={styles.bookingDetailsItem}>
									<strong>User:</strong>
								</div>
								<div className={styles.bookingDetailsItem}>
									<img
										src={selectedBooking.user.avatar_url}
										alt="Avatar"
										className={styles.bookingAvatar}
									/>
									{selectedBooking.user.name}
								</div>

								<div className={styles.bookingDetailsItem}>
									<strong>Yard Name:</strong>
								</div>
								<div className={styles.bookingDetailsItem}>
									{selectedBooking.yard.yard_name}
								</div>
								<div className={styles.bookingDetailsItem}>
									<strong>Stadium Name:</strong>
								</div>
								<div className={styles.bookingDetailsItem}>
									{selectedBooking.yard.stadium.stadium_name}
								</div>
								<div className={styles.bookingDetailsItem}>
									<strong>Price per Hour:</strong>
								</div>
								<div className={styles.bookingDetailsItem}>
									₫{selectedBooking.yard.price_per_hour.toLocaleString()}
								</div>
								<div className={styles.bookingDetailsItem}>
									<strong>Yard Sport:</strong>
								</div>
								<div className={styles.bookingDetailsItem}>
									{selectedBooking.yard.yard_sport}
								</div>
								<div className={styles.bookingDetailsItem}>
									<strong>Yard Description:</strong>
								</div>
								<div className={styles.bookingDetailsItem}>
									{selectedBooking.yard.yard_description}
								</div>
								<div className={styles.bookingDetailsItem}>
									<strong>Booking Time Start:</strong>
								</div>
								<div className={styles.bookingDetailsItem}>
									{new Date(selectedBooking.time_start).toLocaleString()}
								</div>
								<div className={styles.bookingDetailsItem}>
									<strong>Booking Time End:</strong>
								</div>
								<div className={styles.bookingDetailsItem}>
									{new Date(selectedBooking.time_end).toLocaleString()}
								</div>
								<div className={styles.bookingDetailsItem}>
									<strong>Booking Created At:</strong>
								</div>
								<div className={styles.bookingDetailsItem}>
									{new Date(selectedBooking.created_at).toLocaleString()}
								</div>
							</div>
						</div>
					)}
				</Modal>
			</div>
		</>
	);
};
