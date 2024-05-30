import {Button, Form, Modal, Table, Tag, Tooltip} from 'antd';
import moment from 'moment';
import React, {useState} from 'react';
import styles from './PostPage.module.css';
import SearchFilter from '../../components/SearchFilter/SearchFilter';
import {Helmet} from 'react-helmet';

const {Column} = Table;
const {Item} = Form;

const dataSource = [
	{
		key: '1',
		byUser: 'Alice',
		title: 'Introduction to React',
		content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		imgUrl: 'https://example.com/image.jpg',
		videoUrl: 'https://example.com/video.mp4',
		createdAt: moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm'),
		tags: ['#react', '#webdevelopment'],
		status: 'Success',
	},
	{
		key: '2',
		byUser: 'Bob',
		title: 'JavaScript Basics',
		content: 'Nullam at tristique risus, et dignissim ex.',
		imgUrl: 'https://example.com/image2.jpg',
		videoUrl: '',
		createdAt: moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm'),
		tags: ['#javascript', '#programming'],
		status: 'Fail',
	},
	{
		key: '3',
		byUser: 'Charlie',
		title: 'Tips for Improving Your Soccer Skills',
		content: 'Learn how to dribble like a pro and improve your shooting accuracy.',
		imgUrl: 'https://example.com/soccer.jpg',
		videoUrl: 'https://example.com/soccer_tips.mp4',
		createdAt: moment().subtract(3, 'days').format('YYYY-MM-DD HH:mm'),
		tags: ['#soccer', '#sports'],
		status: 'Success',
	},
	{
		key: '4',
		byUser: 'David',
		title: 'Basketball Training Drills',
		content: 'Master your basketball skills with these effective training drills.',
		imgUrl: 'https://example.com/basketball.jpg',
		videoUrl: '',
		createdAt: moment().subtract(4, 'days').format('YYYY-MM-DD HH:mm'),
		tags: ['#basketball', '#training'],
		status: 'Fail',
	},
	{
		key: '5',
		byUser: 'Eve',
		title: 'Fitness Routine for Athletes',
		content: 'Stay in top shape with this comprehensive fitness routine designed for athletes.',
		imgUrl: 'https://example.com/fitness.jpg',
		videoUrl: 'https://example.com/fitness_routine.mp4',
		createdAt: moment().subtract(5, 'days').format('YYYY-MM-DD HH:mm'),
		tags: ['#fitness', '#training'],
		status: 'Cancel',
	},
	{
		key: '6',
		byUser: 'Frank',
		title: 'Essential Gear for Running',
		content:
			'Discover the must-have gear for runners to enhance performance and prevent injuries.',
		imgUrl: 'https://example.com/running.jpg',
		videoUrl: '',
		createdAt: moment().subtract(6, 'days').format('YYYY-MM-DD HH:mm'),
		tags: ['#running', '#gear'],
		status: 'Success',
	},
	{
		key: '7',
		byUser: 'Grace',
		title: 'Nutrition Tips for Athletes',
		content: 'Optimize your performance with these nutrition tips tailored for athletes.',
		imgUrl: 'https://example.com/nutrition.jpg',
		videoUrl: 'https://example.com/nutrition_tips.mp4',
		createdAt: moment().subtract(7, 'days').format('YYYY-MM-DD HH:mm'),
		tags: ['#nutrition', '#sports'],
		status: 'Fail',
	},
	{
		key: '8',
		byUser: 'Harry',
		title: 'Yoga for Flexibility',
		content:
			'Improve flexibility and prevent injuries with this yoga routine designed for athletes.',
		imgUrl: 'https://example.com/yoga.jpg',
		videoUrl: '',
		createdAt: moment().subtract(8, 'days').format('YYYY-MM-DD HH:mm'),
		tags: ['#yoga', '#fitness'],
		status: 'Cancel',
	},
	{
		key: '9',
		byUser: 'Isabelle',
		title: 'Injury Prevention Tips for Cyclists',
		content:
			'Stay injury-free on the road with these essential injury prevention tips for cyclists.',
		imgUrl: 'https://example.com/cycling.jpg',
		videoUrl: 'https://example.com/cycling_tips.mp4',
		createdAt: moment().subtract(9, 'days').format('YYYY-MM-DD HH:mm'),
		tags: ['#cycling', '#sports'],
		status: 'Success',
	},
	{
		key: '10',
		byUser: 'Jack',
		title: 'Motivational Quotes for Athletes',
		content: 'Find inspiration and motivation with these powerful quotes for athletes.',
		imgUrl: 'https://example.com/motivation.jpg',
		videoUrl: '',
		createdAt: moment().subtract(10, 'days').format('YYYY-MM-DD HH:mm'),
		tags: ['#motivation', '#sports'],
		status: 'Fail',
	},
	{
		key: '11',
		byUser: 'Kate',
		title: 'Best CrossFit Workouts',
		content: 'Challenge yourself with these intense CrossFit workouts for ultimate fitness.',
		imgUrl: 'https://example.com/crossfit.jpg',
		videoUrl: 'https://example.com/crossfit_workouts.mp4',
		createdAt: moment().subtract(11, 'days').format('YYYY-MM-DD HH:mm'),
		tags: ['#crossfit', '#fitness'],
		status: 'Cancel',
	},
	{
		key: '12',
		byUser: 'Leo',
		title: 'Running Events Calendar',
		content:
			'Stay updated on upcoming running events in your area with this comprehensive calendar.',
		imgUrl: 'https://example.com/running_events.jpg',
		videoUrl: '',
		createdAt: moment().subtract(12, 'days').format('YYYY-MM-DD HH:mm'),
		tags: ['#running', '#events'],
		status: 'Success',
	},
	{
		key: '13',
		byUser: 'Mary',
		title: 'Healthy Smoothie Recipes',
		content:
			'Boost your energy and recovery with these delicious and nutritious smoothie recipes.',
		imgUrl: 'https://example.com/smoothies.jpg',
		videoUrl: 'https://example.com/smoothie_recipes.mp4',
		createdAt: moment().subtract(13, 'days').format('YYYY-MM-DD HH:mm'),
		tags: ['#nutrition', '#recipes'],
		status: 'Fail',
	},
	{
		key: '14',
		byUser: 'Nick',
		title: 'Outdoor Adventure Sports Guide',
		content: 'Embark on thrilling outdoor adventures with this comprehensive sports guide.',
		imgUrl: 'https://example.com/outdoor.jpg',
		videoUrl: '',
		createdAt: moment().subtract(14, 'days').format('YYYY-MM-DD HH:mm'),
		tags: ['#adventure', '#outdoors'],
		status: 'Cancel',
	},

	// Add more data as needed
];

export const PostPage = () => {
	const [form] = Form.useForm();
	const [modalVisible, setModalVisible] = useState(false);
	const [deleteModalVisible, setDeleteModalVisible] = useState(false);
	const [selectedPost, setSelectedPost] = useState(null);
	const [isEditMode, setIsEditMode] = useState(false);

	const fields = [
		{label: 'By User', name: 'byUser'},
		{label: 'Title', name: 'title'},
		{label: 'Content', name: 'content', type: 'TextArea'},
		{label: 'Img Url', name: 'imgUrl'},
		{label: 'Video Url', name: 'videoUrl'},
		{label: 'Created At', name: 'createdAt', type: 'Date'}, // Modify this line
		{label: 'Tags', name: 'tags'},
		{label: 'Status', name: 'status', type: 'Status', options: ['Success', 'Fail', 'Cancel']}, // Modify this line
	];

	const handleSearch = (values) => {
		// Handle search logic here
		console.log('Search values:', values);
	};

	const handleCreatePost = () => {
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
				<title>Manage Post</title>
			</Helmet>
			<div className={styles.postContainer}>
				<div className={styles.postTitle}>
					<h1>Manage Posts</h1>
				</div>
				<SearchFilter fields={fields} onSearch={handleSearch} />
				<div className={styles.createBtn}>
					<Button type="primary" onClick={handleCreatePost}>
						Create Post
					</Button>
				</div>
				<div>
					<Table dataSource={dataSource} rowKey="key" pagination={{pageSize: 5}}>
						<Column title="By User" dataIndex="byUser" key="byUser" />
						<Column title="Title" dataIndex="title" key="title" />
						<Column
							title="Content"
							dataIndex="content"
							key="content"
							ellipsis={{showTitle: false}}
							render={(text) => (
								<Tooltip placement="topLeft" title={text}>
									{text}
								</Tooltip>
							)}
						/>
						<Column
							title="Img Url"
							dataIndex="imgUrl"
							key="imgUrl"
							ellipsis={{showTitle: false}}
							render={(text) => (
								<Tooltip placement="topLeft" title={text}>
									<a href={text} target="_blank" rel="noopener noreferrer">
										{text}
									</a>
								</Tooltip>
							)}
						/>
						<Column
							title="Video Url"
							dataIndex="videoUrl"
							key="videoUrl"
							ellipsis={{showTitle: false}}
							render={(text) => (
								<Tooltip placement="topLeft" title={text}>
									<a href={text} target="_blank" rel="noopener noreferrer">
										{text}
									</a>
								</Tooltip>
							)}
						/>

						<Column title="Created At" dataIndex="createdAt" key="createdAt" />
						<Column
							title="Tags"
							dataIndex="tags"
							key="tags"
							ellipsis={{showTitle: false}}
							render={(tags) => (
								<span>
									{tags.map((tag) => (
										<Tag key={tag}>{tag}</Tag>
									))}
								</span>
							)}
						/>
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

export default PostPage;
