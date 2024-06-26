// DefaultLayout.jsx

import React, {useState} from 'react';
import {Layout, Menu} from 'antd';
import {useSelector} from 'react-redux';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {imageExporter} from '../assets/images';
import {getUserSelector} from '../redux/selectors';
import {Header} from '../components/Header/Header';
import TopNavbar from '../components/TopNavBar/TopNavBar'; // Import the TopNavbar component
import {
	DashboardOutlined,
	DisconnectOutlined,
	EditOutlined,
	FileTextOutlined,
	FundViewOutlined,
	TransactionOutlined,
	UserOutlined,
	GiftOutlined,
	HomeOutlined,
} from '@ant-design/icons';

const {Footer, Sider, Content} = Layout;

function getItem(label, key, icon, children) {
	return {
		key,
		icon,
		children,
		label,
	};
}

export const DefaultLayout = ({children}) => {
	const navigate = useNavigate();
	const [collapsed, setCollapsed] = useState(false);
	const location = useLocation();
	const [selectMenu, setSelectMenu] = useState(location.pathname);

	// Pages which will show sidebar menu
	const pageLocation = [
		'/dashboard',
		'/users',
		'/matches',
		'/reports',
		'/ads',
		'/posts',
		'/transactions',
		'/stadiums',
		'/vouchers',

		// add more pages here
	];

	// Menu sidebar items
	const items = [
		getItem('Dashboard', '/dashboard', <DashboardOutlined />),
		getItem('Manage User', '/users', <UserOutlined />),
		getItem('Manage Match', '/matches', <DisconnectOutlined />),
		getItem('Manage Report', '/reports', <FileTextOutlined />),
		getItem('Manage Advertisement', '/ads', <FundViewOutlined />),
		getItem('Manage Post', '/posts', <EditOutlined />),
		getItem('Manage Transaction', '/transactions', <TransactionOutlined />),
		getItem('Manage Stadium', '/stadiums', <HomeOutlined />),
		getItem('Manage Voucher', '/vouchers', <GiftOutlined />),

		// add more items here
	];

	// handle save menu and redirect
	const handleClickMenuItem = (e) => {
		console.log('click ', e.key);
		setSelectMenu(e.key);
		navigate(e.key);
	};

	// Conditionally render header, top navbar, and footer based on location
	const isLoginPage = location.pathname === '/login';
	const isSignUpPage = location.pathname === '/signup';
	const showHeaderFooter = !(isLoginPage || isSignUpPage);

	return (
		<Layout style={{minHeight: '100vh'}}>
			<Layout>
				<Sider
					collapsed={collapsed}
					onCollapse={(value) => setCollapsed(value)}
					theme="light"
					style={{
						display: pageLocation.includes(location.pathname) ? 'block' : 'none',
					}}
				>
					<Link to="/dashboard" style={{width: '200px', height: '100px'}}>
						<img
							style={{
								width: '100%',
								maxHeight: '100%',
								objectPosition: 'center',
								objectFit: 'cover',
							}}
							src={imageExporter.logo}
							alt="logo"
						></img>
					</Link>
					<Menu
						onClick={handleClickMenuItem}
						theme="light"
						defaultSelectedKeys={['1']}
						selectedKeys={[selectMenu]}
						mode="inline"
						items={items}
					/>
				</Sider>
				<Layout
					style={{
						backgroundColor: '#eaeaea',
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					{showHeaderFooter && <TopNavbar />} {/* Conditionally render TopNavbar */}
					{showHeaderFooter && <Header />} {/* Conditionally render Header */}
					<Content
						style={{
							margin: '16px',
							overflow: 'hidden',
							backgroundColor: '#ffffff',
						}}
					>
						<div
							style={{
								minHeight: 360,
							}}
						>
							{children}
						</div>
					</Content>
					{showHeaderFooter && (
						<Footer style={{textAlign: 'center'}}>
							SportLinker Admin Page ©{new Date().getFullYear()} Created by
							SportLinker Team
						</Footer>
					)}{' '}
					{/* Conditionally render Footer */}
				</Layout>
			</Layout>
		</Layout>
	);
};
