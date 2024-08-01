import {
	Box,
	Card,
	CardContent,
	CardHeader,
	Container,
	Divider,
	FormControl,
	Grid,
	MenuItem,
	Select,
	Stack,
	Typography,
} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import ReactLoading from 'react-loading';
import {useDispatch, useSelector} from 'react-redux';
import {getAllDashboardSelector, getLoadingDashboardSelector} from '../../redux/selectors';
import {getAllDashboard} from '../../redux/slices/dashboardSlice';
import {OverviewBookKpi, OverviewKpi} from './overview/OverviewKpi';
import {OverviewSummary} from './overview/OverviewSummary';

const DashboardPage = () => {
	const currentDate = new Date();
	const currentMonth = currentDate.getMonth() + 1;
	const currentYear = currentDate.getFullYear();

	const dispatch = useDispatch();
	const data = useSelector(getAllDashboardSelector);
	const loading = useSelector(getLoadingDashboardSelector);
	const [month, setMonth] = useState(currentMonth);
	const [year, setYear] = useState(currentYear);
	const [selectedTable, setSelectedTable] = useState('bookings');
	const [dashboard, setDashboard] = useState([]);

	useEffect(() => {
		dispatch(getAllDashboard({month, year}));
	}, [dispatch, month, year]);

	useEffect(() => {
		if (data) {
			setDashboard(data);
		}
	}, [data]);

	const handleMonthChange = (event) => {
		setMonth(event.target.value);
	};

	const handleYearChange = (event) => {
		setYear(event.target.value);
	};

	const formatNumber = (num) => num.toFixed(1);

	return (
		<>
			<Helmet>
				<title>Dashboard</title>
			</Helmet>
			<Box sx={{flexGrow: 1, py: 8, bgcolor: '#f4f6f8'}}>
				<Container maxWidth="xl">
					{loading ? (
						<Box
							display="flex"
							justifyContent="center"
							alignItems="center"
							height="100vh"
						>
							<ReactLoading type="spinningBubbles" color="#4878db" />
						</Box>
					) : (
						<Stack spacing={1}>
							<Typography
								variant="h4"
								sx={{fontWeight: 'bold', color: 'primary.main'}}
							>
								Dashboard Reports
							</Typography>

							<div style={{display: 'flex', justifyContent: 'flex-end'}}>
								<FormControl sx={{minWidth: 120, mr: 2}}>
									<Select
										labelId="select-month-label"
										id="select-month"
										value={month}
										onChange={handleMonthChange}
									>
										{Array.from({length: 12}, (_, i) => (
											<MenuItem key={i + 1} value={i + 1}>
												{new Date(0, i).toLocaleString('default', {
													month: 'long',
												})}
											</MenuItem>
										))}
									</Select>
								</FormControl>
								<FormControl sx={{minWidth: 120}}>
									<Select
										labelId="select-year-label"
										id="select-year"
										value={year}
										onChange={handleYearChange}
									>
										{[2022, 2023, 2024, 2025].map((y) => (
											<MenuItem key={y} value={y}>
												{y}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</div>
							<Grid container spacing={1}>
								<Grid item xs={3}>
									<OverviewSummary
										label="Total Players"
										value={dashboard?.users?.players?.total_player.toLocaleString(
											'vi-VN'
										)}
									/>
								</Grid>
								<Grid item xs={3}>
									<OverviewSummary
										label="Total Stadium Accounts"
										value={dashboard?.users?.stadiums?.total_stadium_account.toLocaleString(
											'vi-VN'
										)}
									/>
								</Grid>
								<Grid item xs={3}>
									<OverviewSummary
										label="Total Blogs"
										value={dashboard?.blogs?.total_blog.toLocaleString('vi-VN')}
									/>
								</Grid>
								<Grid item xs={3}>
									<OverviewSummary
										label="Total Premium"
										value={`${dashboard?.premiums?.total_premium}`}
									/>
								</Grid>
							</Grid>
							<Grid container spacing={1}>
								<Grid item xs={12}>
									<Box>
										<Card sx={{boxShadow: 3}}>
											<CardHeader title="Match Summary" />
											<Divider />
											<CardContent>
												<Stack
													direction="row"
													justifyContent="center"
													spacing={3}
												>
													<Grid item xs={6}>
														<OverviewSummary
															label="Total Matches"
															value={dashboard?.matches?.total_match.toLocaleString(
																'vi-VN'
															)}
														/>
													</Grid>
													<Grid item xs={6}>
														<OverviewSummary
															label="Change from last month"
															value={`${dashboard?.matches?.compare_last_month}%`}
														/>
													</Grid>
												</Stack>
												<OverviewKpi
													chartSeries={[
														{
															name: 'Total Matches',
															data: dashboard?.matches?.match_by_time.map(
																(item) => ({
																	x: item.time,
																	y: item.total_match,
																})
															),
														},
													]}
												/>
											</CardContent>
										</Card>
									</Box>
								</Grid>
							</Grid>
							<Grid container spacing={1}>
								<Grid item xs={12}>
									<Box mb={3}>
										<Card sx={{boxShadow: 3, width: '100%'}}>
											<div style={{display: 'flex'}}>
												<CardHeader title="Booking Summary" />
											</div>
											<Divider />
											<CardContent>
												<Stack
													direction="row"
													justifyContent="center"
													spacing={3}
												>
													<Grid item xs={3}>
														<OverviewSummary
															label="Total Bookings"
															value={dashboard?.bookings?.bookings?.total_booking.toLocaleString(
																'vi-VN'
															)}
														/>
													</Grid>
													<Grid item xs={3}>
														<OverviewSummary
															label="Total Income"
															value={dashboard?.revenues?.income?.total_income.toLocaleString(
																'vi-VN'
															)}
														/>
													</Grid>
													<Grid item xs={3}>
														<OverviewSummary
															label="Total Revenue"
															value={`${dashboard?.revenues?.revenue?.total_revenue.toLocaleString('vi-VN')} VNĐ`}
														/>
													</Grid>
													<Grid item xs={3}>
														<OverviewSummary
															label="Booking Revenue (30%)"
															value={`${(
																dashboard?.revenues?.revenue
																	?.total_revenue * 0.3
															).toLocaleString('vi-VN')} VNĐ`}
														/>
													</Grid>
												</Stack>
												<OverviewBookKpi
													chartSeries={[
														{
															name:
																selectedTable
																	.charAt(0)
																	.toUpperCase() +
																selectedTable.slice(1),
															data: dashboard?.bookings?.bookings?.booking_by_day_of_week
																.filter((item) => item !== null)
																.map((item) => ({
																	x: [
																		'Mon',
																		'Tue',
																		'Wed',
																		'Thu',
																		'Fri',
																		'Sat',
																		'Sun',
																	][item.day],
																	y: item.total,
																})),
														},
													]}
												/>
											</CardContent>
										</Card>
									</Box>
								</Grid>
							</Grid>
						</Stack>
					)}
				</Container>
			</Box>
		</>
	);
};

export default DashboardPage;
