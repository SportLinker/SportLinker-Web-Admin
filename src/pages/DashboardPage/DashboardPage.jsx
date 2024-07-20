import {
	Box,
	Card,
	CardActions,
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
import {Button} from 'antd';
import {useEffect, useState} from 'react';
import Chart from 'react-apexcharts';
import {Helmet} from 'react-helmet';
import ReactLoading from 'react-loading';
import {useDispatch, useSelector} from 'react-redux';
import {getAllDashboardSelector, getLoadingDashboardSelector} from '../../redux/selectors';
import {getAllDashboard} from '../../redux/slices/dashboardSlice';
import {OverviewKpi} from './overview/OverviewKpi';
import {OverviewSummary} from './overview/OverviewSummary';

const useChartOptions = () => {
	const theme = useTheme();

	return {
		chart: {
			background: 'transparent',
			toolbar: {show: false},
			zoom: {enabled: false},
		},
		dataLabels: {enabled: false},
		stroke: {width: 2},
		colors: [theme.palette.primary.main],
		xaxis: {
			categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
			labels: {style: {colors: theme.palette.text.secondary}},
		},
		yaxis: {
			labels: {style: {colors: theme.palette.text.secondary}},
		},
	};
};

const DashboardPage = () => {
	const currentDate = new Date();
	const currentMonth = currentDate.getMonth() + 1;
	const currentYear = currentDate.getFullYear();

	const dispatch = useDispatch();
	const data = useSelector(getAllDashboardSelector);
	const loading = useSelector(getLoadingDashboardSelector);
	const [month, setMonth] = useState(currentMonth);
	const [year, setYear] = useState(currentYear);
	const [isPlayersView, setIsPlayersView] = useState(true);
	const [selectedTable, setSelectedTable] = useState('bookings');
	const [showSelect, setShowSelect] = useState(false);

	useEffect(() => {
		dispatch(getAllDashboard({month, year}));
	}, [dispatch, month, year]);

	const toggleView = () => {
		setIsPlayersView((prev) => !prev);
	};

	const handleChangeTable = (event) => {
		setSelectedTable(event.target.value);
		setShowSelect(false);
	};

	const handleMonthChange = (event) => {
		setMonth(event.target.value);
	};

	const handleYearChange = (event) => {
		setYear(event.target.value);
	};

	const chartOptions = useChartOptions();

	// Function to format numbers to one decimal place
	const formatNumber = (num) => {
		return num.toFixed(1); // Fixed to one decimal place
	};

	if (!data) return <ReactLoading type="spin" color="#fff" />;

	return (
		<>
			{!loading && (
				<>
					<Helmet>
						<title>Dashboard</title>
					</Helmet>
					<Box sx={{flexGrow: 1, py: 8, bgcolor: '#f4f6f8'}}>
						<Container maxWidth="xl">
							<Stack spacing={1}>
								<Typography
									variant="h4"
									sx={{fontWeight: 'bold', color: 'primary.main'}}
								>
									Dashboard Reports
								</Typography>
								<div style={{display: 'flex', justifyContent: 'flex-end'}}>
									<FormControl
										sx={{minWidth: 120, mr: 2, mb: 'auto', mt: 'auto'}}
									>
										<Select
											labelId="select-month-label"
											id="select-month"
											value={month}
											onChange={handleMonthChange}
										>
											<MenuItem value={1}>January</MenuItem>
											<MenuItem value={2}>February</MenuItem>
											<MenuItem value={3}>March</MenuItem>
											<MenuItem value={4}>April</MenuItem>
											<MenuItem value={5}>May</MenuItem>
											<MenuItem value={6}>June</MenuItem>
											<MenuItem value={7}>July</MenuItem>
											<MenuItem value={8}>August</MenuItem>
											<MenuItem value={9}>September</MenuItem>
											<MenuItem value={10}>October</MenuItem>
											<MenuItem value={11}>November</MenuItem>
											<MenuItem value={12}>December</MenuItem>
										</Select>
									</FormControl>
									<FormControl sx={{minWidth: 120, mb: 'auto', mt: 'auto'}}>
										<Select
											labelId="select-year-label"
											id="select-year"
											value={year}
											onChange={handleYearChange}
										>
											<MenuItem value={2022}>2022</MenuItem>
											<MenuItem value={2023}>2023</MenuItem>
											<MenuItem value={2024}>2024</MenuItem>
											<MenuItem value={2025}>2025</MenuItem>
										</Select>
									</FormControl>
								</div>
								<Grid container spacing={3}>
									{/* Match Summary */}
									<Grid item xs={12} md={4}>
										<Box mb={3}>
											<Card sx={{boxShadow: 3}}>
												<CardHeader title="Match Summary" />
												<Divider />
												<CardContent>
													<Stack
														direction="row"
														justifyContent="center"
														spacing={3}
													>
														<Grid item xs={5}>
															<OverviewSummary
																label="Total Matches"
																value={data.matchs.total_match.toString()}
															/>
														</Grid>
														<Grid item xs={7}>
															<OverviewSummary
																label="Change from last month"
																value={`${formatNumber(
																	data.matchs.compare_last_month
																)}%`}
															/>
														</Grid>
													</Stack>
													<OverviewKpi
														chartSeries={[
															{
																name: 'Total Matches',
																data: data.matchs.match_by_time.map(
																	(item) => ({
																		x: item.time,
																		y: item.total_match,
																	})
																),
															},
														]}
														stats={[
															{
																label: 'Total Matches',
																value: data.matchs.total_match.toString(),
															},
															{
																label: 'Change from last month',
																value: `${formatNumber(
																	data.matchs.compare_last_month
																)}%`,
															},
														]}
													/>
												</CardContent>
											</Card>
										</Box>
									</Grid>

									{/* Blog Summary */}
									<Grid item xs={12} md={4}>
										<Box mb={3}>
											<Card sx={{boxShadow: 3}}>
												<CardHeader title="Blog Summary" />
												<Divider />
												<CardContent>
													<Stack
														direction="row"
														justifyContent="center"
														spacing={3}
													>
														<Grid item xs={5}>
															<OverviewSummary
																label="Total Blogs"
																value={data.blogs.total_blog.toString()}
															/>
														</Grid>
														<Grid item xs={7}>
															<OverviewSummary
																label="Change from last month"
																value={`${formatNumber(
																	data.blogs.compare_last_month
																)}%`}
															/>
														</Grid>
													</Stack>
													<Chart
														options={chartOptions}
														series={[
															{
																name: 'Blogs',
																data: Array(7).fill(
																	data.blogs.total_blog / 7
																), // Dummy data
															},
														]}
														type="bar"
														height={200}
													/>
												</CardContent>
											</Card>
										</Box>
									</Grid>

									{/* User Summary */}
									<Grid item xs={12} md={4}>
										<Box mb={3}>
											<Card sx={{boxShadow: 3}}>
												<div
													style={{
														display: 'flex',
														justifyContent: 'space-between',
													}}
												>
													<CardHeader title="User Summary" />
													<CardActions>
														<Button onClick={toggleView}>
															{isPlayersView
																? 'Switch to Stadiums'
																: 'Switch to Players'}
														</Button>
													</CardActions>
												</div>
												<Divider />

												<CardContent>
													<Stack
														direction="row"
														justifyContent="center"
														spacing={3}
													>
														<Grid item xs={5}>
															<OverviewSummary
																label={
																	isPlayersView
																		? 'Total Players'
																		: 'Total Stadium Accounts'
																}
																value={
																	isPlayersView
																		? data.users.players.total_player.toString()
																		: data.users.stadiums.total_stadium_account.toString()
																}
															/>
														</Grid>
														<Grid item xs={7}>
															<OverviewSummary
																label="Change from last month:"
																value={`${
																	isPlayersView
																		? formatNumber(
																				data.users.players
																					.compare_last_month
																			)
																		: formatNumber(
																				data.users.stadiums
																					.compare_last_month
																			)
																}%`}
															/>
														</Grid>
													</Stack>
													<Chart
														options={chartOptions}
														series={[
															{
																name: isPlayersView
																	? 'Players'
																	: 'Stadiums',
																data: Array(7).fill(
																	isPlayersView
																		? formatNumber(
																				data.users.players
																					.total_player /
																					7
																			)
																		: formatNumber(
																				data.users.stadiums
																					.total_stadium_account /
																					7
																			)
																),
															},
														]}
														type="bubble"
														height={200}
													/>
												</CardContent>
											</Card>
										</Box>
									</Grid>

									{/* Booking Summary */}
									<Grid item xs={12}>
										<Box mb={3}>
											<Card sx={{boxShadow: 3, width: '100%'}}>
												<div
													style={{
														display: 'flex',
													}}
												>
													<CardHeader title="Booking Summary" />
													<FormControl
														sx={{
															minWidth: 120,
															mt: 'auto',
															mb: 'auto',
														}}
													>
														{/* <Select
															labelId="select-table-label"
															id="select-table"
															value={selectedTable}
															onChange={handleChangeTable}
														>
															<MenuItem value="bookings">
																Bookings
															</MenuItem>
															<MenuItem value="incomes">
																Incomes
															</MenuItem>
															<MenuItem value="revenues">
																Revenues
															</MenuItem>
														</Select> */}
													</FormControl>
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
																label={'Total Bookings'}
																value={data.bookings.bookings.total_booking.toString()}
															/>
														</Grid>
														<Grid item xs={3}>
															<OverviewSummary
																label={'Total Income'}
																value={data.bookings.incomes.total_income.toString()}
															/>
														</Grid>
														<Grid item xs={3}>
															<OverviewSummary
																label={'Total Revenue'}
																value={`${data.bookings.revenues.total_revenue.toString()} VNĐ`}
															/>
														</Grid>

														<Grid item xs={3}>
															<OverviewSummary
																label="Booking Revenue (30%)"
																value={`${(
																	data.bookings.revenues
																		.total_revenue * 0.3
																).toFixed(2)} VNĐ`}
															/>
														</Grid>
														{/* 
														<Grid item xs={3}>
															<OverviewSummary
																label="% Change from last month:"
																value={
																	selectedTable === 'bookings'
																		? `${formatNumber(
																				data.bookings
																					.bookings
																					.compare_last_month
																			)}%`
																		: selectedTable ===
																			  'incomes'
																			? `${formatNumber(
																					data.bookings
																						.incomes
																						.compare_last_month
																				)}%`
																			: selectedTable ===
																				  'revenues'
																				? `${formatNumber(
																						data
																							.bookings
																							.revenues
																							.compare_last_month
																					)}%`
																				: ''
																}
															/>
														</Grid> */}
													</Stack>

													{/* Chart based on selected table */}
													<Chart
														options={chartOptions}
														series={[
															{
																name:
																	selectedTable === 'bookings'
																		? 'Revenue'
																		: 'Data',
																data: Array(7).fill(
																	formatNumber(
																		selectedTable === 'bookings'
																			? data.bookings.bookings
																					.total_booking /
																					7
																			: selectedTable ===
																				  'incomes'
																				? data.bookings
																						.incomes
																						.total_income /
																					7
																				: selectedTable ===
																					  'revenues'
																					? data.bookings
																							.revenues
																							.total_revenue /
																						7
																					: 0
																	)
																),
															},
														]}
														type="area"
														height={200}
													/>
												</CardContent>
											</Card>
										</Box>
									</Grid>
								</Grid>
							</Stack>
						</Container>
					</Box>
				</>
			)}
		</>
	);
};

export default DashboardPage;
